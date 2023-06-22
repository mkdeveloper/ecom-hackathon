"use client";
import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { Image as sanImage } from "sanity";

interface Product {
  name: string;
  image: Array<sanImage>;
}

interface ImageProps {
  product: Product;
}

const ImageComponent = ({ product }: ImageProps) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col items-center gap-y-5">
        {product.image.map((image, index) => (
          <Image
            key={index}
            src={urlForImage(image).url()}
            alt={product.name}
            width={100}
            height={100}
            onMouseEnter={() => setImageIndex(index)}
          />
        ))}
      </div>
      <div className="w-full h-full">
        <Image
          src={urlForImage(product.image[imageIndex]).url()}
          alt={product.name}
          width={1000}
          height={1000}
        />
      </div>
    </>
  );
};

export default ImageComponent;
