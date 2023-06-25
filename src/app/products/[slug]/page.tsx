import Wrapper from "@/components/shared/Wrapper";
import { client } from "../../../../sanity/lib/client";
import ImageComponent from "@/components/utils/ImageComponent";
import AddtoCartProduct from "@/components/shared/addtoCartProduct";
import { Product } from "@/interfaces";
import { auth } from "@clerk/nextjs";

type Props = {
  params: {
    slug: string;
  };
};

// fetching data from sanity
const getProduct = async ({ params }: Props) => {
  const query = `*[_type == "product" && slug.current == "${params.slug}"][0]{
    _id,
    name,
    price,
    description,
    subcat,
    image,
  }`;
  //added first index of an array, as we required data for single slug
  const res = await client.fetch(query);
  return res;
};

const SingleProduct = async ({ params }: Props) => {
  const { userId } = auth();
  const product: Product = await getProduct({ params });

  return (
    <Wrapper>
      <div className="grid grid-cols-[5rem,1fr] bs:grid-cols-[10rem,1fr] lg:grid-cols-[10rem,1fr,1fr] px-10 lg:px-0 gap-1">
        <ImageComponent product={product} />
        <div className="flex flex-col justify-start items-start col-span-2 lg:col-span-1 lg:ml-5">
          <h3 className="font-normal">{product.name}</h3>
          <p className="text-gray-400 text-xl font-semibold">
            {product.subcat}
          </p>
          <p className="mt-16 mb-3 text-xl font-semibold">Select Size</p>
          <div className="flex justify-between items-center text-xl font-semibold text-white gap-x-5  uppercase my-3 ">
            <span className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-200 hover:text-black bg-slate-400">
              xs
            </span>
            <span className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-200 hover:text-black bg-slate-400">
              s
            </span>
            <span className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-200 hover:text-black bg-slate-400">
              m
            </span>
            <span className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-200 hover:text-black bg-slate-400">
              l
            </span>
            <span className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-200 hover:text-black bg-slate-400">
              xl
            </span>
          </div>
          <h3 className="font-normal mt-10">
            Price: <span className="font-bold">${product.price}.00</span>
          </h3>
          <AddtoCartProduct
            product={product}
            qty={1}
            userId={userId as string}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProduct;

// export async function generateStaticParams() {
//   const query = `*[_type == "product"]{
//     slug {
//       current
//     }
//   }`;
//   const res: SanityProducts[] = await client.fetch(query);

//   return res.map((product) => ({
//     slug: product.slug.current,
//   }));
// }
