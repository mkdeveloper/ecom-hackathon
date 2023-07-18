"use client";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Image from "next/image";
import Link from "next/link";
import Menu from "../shared/Menu";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchData } from "@/redux/features/cartSlice";
import { UserButton } from "@clerk/nextjs";
const Navbar = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData(userId)); // Dispatch the fetchData action with the user id
  }, [dispatch, userId]);

  const [nav, setNav] = useState(false);
  const totalItems = useAppSelector((state) => state.cart.totalQuantity);

  // const totalI = totalItems ? totalItems : 0;

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav>
      {/* Large Srceen */}
      <div className="flex justify-between items-center w-full h-20 lg:px-20 px-5 max-w-[1240px] mx-auto">
        <div>
          <Link href={"/"}>
            <Image src="/Logo.webp" alt="" width={150} height={150} />
          </Link>
        </div>
        <div className="hidden lg:block">
          <Menu />
        </div>
        <div className="border border-gray-300 rounded-md px-2 bg-white hidden lg:flex items-center w-[30%]">
          <AiOutlineSearch size={15} />
          <input
            type="text"
            placeholder="What you looking for"
            className="outline-none ml-1"
          />
        </div>
        <div className="hidden lg:flex items-center justify-between gap-2">
          <UserButton afterSignOutUrl="/" />
          <Link href={"/cart"} onClick={handleNav}>
            <div className="w-10 h-10 rounded-full bg-[#f1f1f1] flex justify-center items-center relative">
              <AiOutlineShoppingCart size={25} />
              <span className="absolute left-7 bottom-7 w-5 h-5 bg-[#f02d34] text-white text-xs rounded-full flex justify-center items-center">
                {totalItems}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex justify-center items-center lg:hidden">
          <AiOutlineMenu onClick={handleNav} size={25} />
        </div>
      </div>
      {/* Mobile Srceen */}
      <div
        className={`${
          nav
            ? "flex lg:hidden flex-col w-full h-screen items-center fixed top-0 left-0 z-[100] bg-white px-5 "
            : "flex lg:hidden flex-col w-full h-screen items-center fixed top-[-100%] left-0 z-[100] bg-white px-5 "
        }`}
      >
        <div className="flex justify-between items-center w-full h-20">
          <div>
            <Link href={"/"}>
              <Image src="/Logo.webp" alt="" width={150} height={150} />
            </Link>
          </div>
          <div>
            <TiDeleteOutline onClick={handleNav} size={30} />
          </div>
        </div>
        <div className="mt-28 flex flex-col items-center justify-center gap-5">
          <UserButton afterSignOutUrl="/" />
          <Link href={"/cart"} onClick={handleNav}>
            <div className="w-12 h-12 rounded-full bg-[#f1f1f1] flex justify-center items-center relative">
              <AiOutlineShoppingCart />

              <span className="absolute bottom-8 left-7 w-5 h-5 bg-[#f02d34] text-white text-xs rounded-full flex justify-center items-center">
                {totalItems}
              </span>
            </div>
          </Link>

          <span onClick={handleNav}>
            <Menu />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
