"use client";

import { Product } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { cartActions } from "@/redux/features/cartSlice";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { urlForImage } from "../../../sanity/lib/image";

type IProps = {
  product: Product;
  qty: number;
  userId: string;
};

const AddtoCartProduct = (props: IProps) => {
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const subtract = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleRequestData = async () => {
    const res = await fetch(`/api/cart/${props.userId}`);
    if (!res.ok) {
      throw new Error("Failed to Fetch Data From API");
    }
    const data = await res.json();
    return data;
  };

  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: props.product._id,
        quantity: qty,
        image: urlForImage(props.product.image[0]).url(),
        product_name: props.product.name,
        subcat: props.product.subcat,
        price: props.product.price,
        totalPrice: props.product.price * props.qty,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add Data");
    }
  };

  const handleCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await handleRequestData();
      const existingItem = cartData.cartItems.find(
        (item: any) => item._id === props.product._id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + qty;
        const newPrice = props.product.price * newQuantity;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
          {
            method: "PUT",
            body: JSON.stringify({
              product_id: props.product._id,
              quantity: newQuantity,
              price: newPrice,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update data");
        }
      } else {
        await handleAddToCart();
      }
    } catch (error) {
      console.log((error as { message: string }).message);
    }

    setIsLoading(false);
  };

  const addtoCart = () => {
    toast.promise(handleCart(), {
      loading: "Adding To Cart",
      success: "Product added To Cart",
      error: "Failed to Add Product to cart",
    });
    dispatch(cartActions.addToCart({ product: props.product, quantity: qty }));
  };
  return (
    <>
      <div className="flex justify-center items-center gap-5 text-2xl font-bold mt-8">
        <p>Quantity:</p>
        <button
          onClick={subtract}
          className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
        >
          -
        </button>
        {qty}
        <button
          onClick={() => setQty(qty + 1)}
          className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
        >
          +
        </button>
      </div>
      <button
        onClick={addtoCart}
        className="flex justify-center items-center gap-3 bg-[#212121] text-white px-6 py-2 mt-5 disabled:cursor-not-allowed disabled:bg-gray-500"
        disabled={isLoading}
      >
        <FaShoppingCart size={25} />
        {isLoading ? "Adding to cart" : "Add To Cart"}
      </button>
      <Toaster />
    </>
  );
};
export default AddtoCartProduct;
