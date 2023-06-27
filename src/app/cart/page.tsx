"use client";
import CartItemCard from "@/components/shared/CartItemCard";
import Wrapper from "@/components/shared/Wrapper";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { selectIsLoading } from "@/redux/features/cartSlice";
import StripeCheckOutButton from "@/components/sections/CheckOut";

const CartDataLoadingFromApi = () => {
  return (
    <Wrapper>
      <div className="flex justify-center items-center w-full h-40">
        <h1>Loading Data</h1>
      </div>
    </Wrapper>
  );
};

const LoadedCartData = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.totalAmount);

  if (cartItems.length > 0) {
    return (
      <Wrapper>
        <h3>Shopping Cart</h3>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-x-5 px-5">
          <div className="basis-3/4">
            {cartItems.map((elm) => (
              <CartItemCard key={elm._id} cartItem={elm} />
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
              <div className="" onClick={() => console.log("added")}>
                <StripeCheckOutButton products={cartItems} />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <h3>Shopping Cart</h3>

        <div className="flex flex-col w-full gap-10 h-full justify-center items-center">
          <BiShoppingBag size={200} />
          <h1>Your shopping bag is empty</h1>
          <Link
            href="/products"
            className="flex justify-center items-center gap-3 border border-gray-200 rounded-sm bg-[#212121] text-white py-2 px-3"
          >
            <AiOutlineShoppingCart size={25} /> Start Shopping
          </Link>
        </div>
      </Wrapper>
    );
  }
};

const CartPage = () => {
  const isLoading = useAppSelector(selectIsLoading);

  return <>{isLoading ? <CartDataLoadingFromApi /> : <LoadedCartData />}</>;
};

export default CartPage;
