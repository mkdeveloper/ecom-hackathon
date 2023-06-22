import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Hero = () => {
  return (
    <Wrapper>
      <div className="flex justify-between items-center w-full gap-y-10 gap-x-20">
        <div className="space-y-10 lg:w-[50%] w-full">
          <span className="px-8 py-2 rounded-md bg-[#e1edff] text-blue-600 font-bold">
            Sale 70%
          </span>
          <h1>An Industrial Take on Streetwear</h1>
          <p>
            Anyone can beat you but no one can beat your outfit as long as you
            wear Dine outfits.
          </p>
          <button className="flex items-center bg-[#212121] text-white rounded-none py-3 px-8">
            <AiOutlineShoppingCart className="mr-2" size={25} />
            Start Shopping
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-5">
            <div>
              <Image
                src="/hero/Featured1.webp"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/hero/Featured2.webp"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/hero/Featured3.webp"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/hero/Featured4.webp"
                alt=""
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <div className="lg:block hidden w-[50%]">
          <div className="relative">
            <div className=" absolute w-[430px] h-[430px] bg-[#ffece3] -z-[10] rounded-full left-5 top-10"></div>
            <Image
              src="/hero/header.webp"
              alt="header"
              width={600}
              height={600}
              className=""
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Hero;
