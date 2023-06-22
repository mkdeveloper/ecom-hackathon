"use client";
import CartItemCard from "@/components/shared/CartItemCard";
import Wrapper from "@/components/shared/Wrapper";
import {
  totalCartItemSelector,
  totalPriceSelector,
} from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalItems = useAppSelector(totalCartItemSelector);
  const totalPrice = useAppSelector(totalPriceSelector);

  console.log(cartItems);

  if (cartItems.length > 0) {
    return (
      <Wrapper>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-x-5 px-5">
          <div className="basis-3/4">
            {cartItems.map((elm) => (
              <CartItemCard key={elm.product._id} cartItem={elm} />
            ))}
          </div>
          <div className="basis-1/4 bg-gray-200 rounded-md w-full h-full  mt-5 sm:mt-0 p-2 self-start">
            <div className="flex flex-col items-center justify-between gap-5">
              <h4>Order Summary</h4>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p>Quantity</p>
                </div>
                <div>
                  <p>{totalItems}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p>Total Amount</p>
                </div>
                <div>
                  <p>${totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div className="flex flex-col w-full gap-10 h-full justify-center items-center">
          <h1>Cart is Empty</h1>
          <Link
            href="/products"
            className="flex justify-center items-center gap-3 border border-gray-300 rounded-sm bg-[#212121] text-white py-2 px-3"
          >
            <AiOutlineShoppingCart size={25} /> Start Shopping
          </Link>
        </div>
      </Wrapper>
    );
  }
};

export default CartPage;
