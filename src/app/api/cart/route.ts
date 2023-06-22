import { cartTable, db } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

type IReqProps = {
  id: number;
  product_id: string;
  product_name: string;
  subcat: string;
  image: string;
  price: number;
  quantity: number;
};

export const POST = async (request: NextRequest) => {
  const { userId } = auth();

  const req: IReqProps = await request.json();

  try {
    if (req) {
      const res = await db
        .insert(cartTable)
        .values({
          user_id: userId as string,
          product_id: req.product_id,
          quantity: req.quantity,
          image: req.image,
          price: req.price,
          product_name: req.product_name,
          subcat: req.subcat,
        })
        .returning();
      return NextResponse.json({ res });
    } else {
      throw new Error("Failed to insert Data");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: "Something went wrong",
    });
  }
};

export const PUT = async (request: NextRequest) => {
  const { userId } = auth();

  const req: IReqProps = await request.json();

  try {
    if (req) {
      const res = await db
        .update(cartTable)
        .set({
          quantity: req.quantity,
          price: req.price,
        })
        .where(
          eq(cartTable.user_id, userId as string) &&
            eq(cartTable.product_id, req.product_id)
        )
        .returning();
      return NextResponse.json({ res });
    } else {
      throw new Error("Failed to update Data");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: "Something went wrong",
    });
  }
};
