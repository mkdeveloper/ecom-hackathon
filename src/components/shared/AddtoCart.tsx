"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { Product } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  decrement,
  increament,
  productQtySelector,
} from "@/redux/features/cartSlice";
import { FC } from "react";
import { Image as SnImage } from "sanity";
import QtyBtn from "./QtyBtn";

interface Props {
  product: Product;
}

const AddtoCart: FC<Props> = (props: Props) => {
  const qty = useAppSelector((state) =>
    productQtySelector(state, props.product._id)
  );

  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: props.product._id,
        quantity: qty,
        image: props.product.image[0],
        product_name: props.product.name,
        subcat: props.product.subcat,
        price: props.product.price,
      }),
    });
  };

  const dispatch = useAppDispatch();

  if (!qty) {
    return (
      <>
        <div className="flex items-center justify-between mt-5 gap-5">
          <button
            onClick={() =>
              dispatch(increament(props.product)) &&
              toast.success("Product added to cart") &&
              handleAddToCart()
            }
            className="flex justify-center items-center p-2 bg-black text-white"
          >
            <AiOutlineShoppingCart size={25} /> Add to Cart
          </button>
        </div>
        <Toaster />
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center mt-5 ">
          <p className="font-semibold mr-3">Quantity:</p>
          <QtyBtn
            onDecrease={() =>
              dispatch(decrement(props.product)) && qty === 1
                ? toast.error("Product Deleted")
                : toast.error("Quantity Decreased")
            }
            onIncrease={() =>
              dispatch(increament(props.product)) &&
              toast.success("Quantity Increase")
            }
            qty={qty}
          />
        </div>
        <Toaster />
      </>
    );
  }
};
export default AddtoCart;
