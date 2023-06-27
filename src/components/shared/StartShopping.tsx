"use client";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";

const StartShopping = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="flex items-center bg-[#212121] text-white rounded-none py-3 px-8"
      onClick={() => router.push("/products")}
    >
      <AiOutlineShoppingCart className="mr-2" size={25} />
      Start Shopping
    </button>
  );
};
export default StartShopping;
