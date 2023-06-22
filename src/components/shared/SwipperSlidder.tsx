"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import { client } from "../../../sanity/lib/client";
import { SanityProducts } from "@/interfaces";

const getProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt asc) {
    _id,
    image,
    name,
    slug {
      current,
    },
    price,
  }`;

  const res = client.fetch(query);
  return res;
};

const SwipperSlidder = async () => {
  const products: SanityProducts[] = await getProducts();
  return (
    <>
      <Swiper
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={10}
      >
        {products.map((p, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-center px-5 py-10 items-center">
              <div className="flex flex-col justify-center items-start h-[400px] mx-10 w-full hover:scale-110 ease-in duration-300 gap-3">
                <Link href={`products/${p.slug.current}`}>
                  <Image
                    src={urlForImage(p.image[0]).url()}
                    alt={p.name}
                    width={400}
                    height={400}
                  />
                  <p className="text-base font-bold text-center my-3">
                    {p.name}
                  </p>
                  <p className="text-base font-bold text-center">${p.price}</p>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwipperSlidder;
