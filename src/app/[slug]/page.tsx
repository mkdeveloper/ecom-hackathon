import Wrapper from "@/components/shared/Wrapper";
import { client } from "../../../sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { SanityProducts } from "@/interfaces";

type Props = {
  params: {
    slug: string;
  };
};

const getProductsbyCategory = async ({ params }: Props) => {
  const str = params.slug;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  const query = `*[_type == "product" && category -> name == "${str2}"] | order(_createdAt asc) {
    _id,
    name,
    image,
    subcat,
    price,
    slug {
      current
    },
  }`;
  const res = await client.fetch(query);
  return res;
};

const Categorical = async ({ params }: Props) => {
  const products: SanityProducts[] = await getProductsbyCategory({ params });
  return (
    <>
      {products.length >= 1 ? (
        <Wrapper>
          <div className="grid grid-cols-1 bs:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 place-items-center px-10">
            {products.map((product) => (
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
                  <h4 className="self-start my-2">{product.name}</h4>
                  <p className="self-start">{product.subcat}</p>
                  <h4 className="self-start mt-3">${product.price}</h4>
                </Link>
              </div>
            ))}
          </div>
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="flex w-full h-40 justify-center items-center">
            <h2>No products found for {params.slug}</h2>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Categorical;

type ICategory = {
  slug: {
    current: string;
  };
};

export async function generateStaticParams() {
  const query = `*[_type == "category"] {
      slug {
      current
      }
  }`;
  const res: ICategory[] = await client.fetch(query);

  return res.map((category) => ({
    slug: category.slug.current,
  }));
}
