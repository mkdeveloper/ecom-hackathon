import SwipperSlidder from "../shared/SwipperSlidder";
import Wrapper from "../shared/Wrapper";



const Products =  () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center px-5 py-20">
        <p className="text-center uppercase tracking-wide text-[#2118FF]">
          PRODUCTS
        </p>
        <h3 className="text-center my-8">Check What We Have</h3>
        <div className="w-full mx-auto ">
          <SwipperSlidder />
        </div>
      </div>
    </Wrapper>
  );
};

export default Products;