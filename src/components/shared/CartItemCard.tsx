"use client";
import { Product } from "@/interfaces";
import { urlForImage } from "../../../sanity/lib/image";
import { useAppDispatch } from "@/redux/store";
import { Toaster, toast } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import { cartActions } from "@/redux/features/cartSlice";
import { useState } from "react";
import Image from "next/image";

interface Props {
  cartItem: Product;
}

const CartItemCard = ({ cartItem }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(cartItem.quantity);
  const dispatch = useAppDispatch();

  const handleCart = async (newQty: number) => {
    setIsLoading(true);
    const newPrice = cartItem.price * newQty;

    try {
      if (newQty) {
        const res = await fetch(`http://localhost:3000/api/cart`, {
          method: "PUT",
          body: JSON.stringify({
            product_id: cartItem._id,
            quantity: newQty,
            price: newPrice,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to update data");
        }
      } else {
        throw new Error("Failed to fetch update");
      }
    } catch (error) {
      console.log((error as { message: string }).message);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    await fetch(`/api/cart/removeitem/${cartItem._id}`, {
      method: "DELETE",
    });
  };

  const increament = () => {
    handleCart(qty + 1);
    setQty(qty + 1);
    dispatch(cartActions.addToCart({ product: cartItem, quantity: 1 }));
    toast.success("Product quantity Increased");
  };

  const decreament = () => {
    if (cartItem.quantity > 1) {
      handleCart(qty - 1);
      setQty(qty - 1);
      dispatch(cartActions.removeFromCart(cartItem._id));
      toast.error("Product quantity Decreased");
    }
  };

  const rmProduct = () => {
    handleDelete();
    dispatch(cartActions.removeProduct(cartItem._id));
    toast.error("Item Removed from Cart");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full px-5 py-7 gap-5 border-b border-gray-300 ">
      <div className="">
        <Image
          // @ts-ignore
          src={cartItem.image}
          alt={cartItem.name}
          width={250}
          height={250}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between items-start w-full">
        <div className="flex justify-between items-center w-80 sm:w-full flex-initial">
          <h4>{cartItem.name}</h4>
          <button onClick={rmProduct} disabled={isLoading}>
            <BsTrash size={25} className="cursor-pointer" />
          </button>
        </div>
        <h5 className="font-semibold my-2 text-gray-400">{cartItem.subcat}</h5>
        <p className="flex flex-col gap-5 my-1 font-semibold text-base">
          Delivery Estimation
          <span className="text-yellow-500">5 Working Days</span>
        </p>
        <div className="flex justify-between items-center w-80 sm:w-full flex-initial">
          <div>${cartItem.price * cartItem.quantity}</div>
          <div className="flex justify-center items-center gap-5 text-2xl font-bold mt-8">
            <p>Quantity:</p>
            <button
              onClick={decreament}
              className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
              disabled={isLoading}
            >
              -
            </button>
            {qty}
            <button
              onClick={increament}
              className="flex justify-center items-center w-10 h-10 border border-gray-700 rounded-full"
              disabled={isLoading}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default CartItemCard;

{
  /* <div className="grid lg:grid-cols-[16rem,1fr,10rem] sm:grid-cols-[8rem,1fr,5rem] grid-cols-[1fr,5rem,5rem] content-center">
      
      <div>
        <div className="flex justify-between items-center w-full">
          <div className="">
            <h4 className="font-semibold">{cartItem.product.name}</h4>
          </div>
        </div>
        <h5 className="font-semibold my-5 text-gray-400">
          {cartItem.product.subcat}
        </h5>
        
        <div className="flex justify-between items-center">
          <h4>${cartItem.product.price}</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 h-full items-center content-between">
        <div className="ml-auto">
          <BsTrashFill />
        </div>
        <div className="ml-auto">
          <QtyBtn
            onDecrease={() =>
              dispatch(decrement(cartItem.product)) &&
              toast.error("Quantity Decreased")
            }
            onIncrease={() =>
              dispatch(increament(cartItem.product)) &&
              toast.success("Quantity Increase")
            }
            qty={cartItem.qty}
          />
        </div>
      </div>
      <Toaster />
    </div> */
}
