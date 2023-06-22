import { cartTable, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) => {
  if (!userId) {
    return NextResponse.json({ message: "Invalid User ID" });
  }

  //   console.log(userId);
  try {
    const res = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.user_id, userId));
    // console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
