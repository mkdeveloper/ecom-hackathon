import { CartItem } from "@/interfaces";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import QtyBtn from "./QtyBtn";
import { useAppDispatch } from "@/redux/store";
import { decrement, increament } from "@/redux/features/cartSlice";
import { Toaster, toast } from "react-hot-toast";

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full px-5 py-7 gap-5 border-b border-gray-300">
      <div className="basis-1/2">
        <Image
          src={urlForImage(cartItem.product.image[0]).url()}
          alt={cartItem.product.name}
          width={220}
          height={220}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between items-start w-full">
        <div className="flex justify-between items-center w-full">
          <h4>{cartItem.product.name}</h4>
        </div>
        <h5 className="font-semibold my-2 text-gray-400">
          {cartItem.product.subcat}
        </h5>
        <p className="flex flex-col gap-5 my-1 font-semibold text-base">
          Delivery Estimation
          <span className="text-yellow-500">5 Working Days</span>
        </p>
        <div className="flex justify-between items-center w-full">
          <div>${cartItem.product.price * cartItem.qty}</div>
          <QtyBtn
            onDecrease={() =>
              dispatch(decrement(cartItem.product)) && cartItem.qty === 1
                ? toast.error("Product Removed from Cart")
                : toast.error("Quantity Decreased")
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
