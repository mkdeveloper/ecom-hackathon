import Wrapper from "@/components/shared/Wrapper";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";
import { SanityProducts } from "@/interfaces";

const getAllProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt asc) {
    _id,
    name,
    subcat,
    image,
    price,
    slug,

  }`;
  const res = await client.fetch(query);

  return res;
};

const AllProducts = async () => {
  const productsData: SanityProducts[] = await getAllProducts();
  return (
    <Wrapper>
      <div className="grid grid-cols-1 bs:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 place-items-center px-10">
        {productsData.map((product) => (
          <div
            key={product._id}
            className="flex flex-col justify-center items-center mt-3 gap-2 hover:scale-110 ease-in duration-300"
          >
            <Link href={`products/${product.slug.current}`}>
              <Image
                src={urlForImage(product.image[0]).url()}
                width={300}
                alt={product.name}
                height={300}
              />
              <h4 className="self-start mt-3">{product.name}</h4>
              <p className="self-start mt-1">{product.subcat}</p>
              <h4 className="self-start mt-3">${product.price}</h4>
            </Link>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default AllProducts;
