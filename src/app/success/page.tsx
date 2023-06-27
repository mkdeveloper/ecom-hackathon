import Wrapper from "@/components/shared/Wrapper";

const SuccessPage = () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center w-full mt-20 gap-5">
        <p className="text-[#9ABC66] font-bold text-9xl leading-[200px] w-52 h-52 text-center rounded-full bg-gray-200">
          ✓
        </p>
        <h1>Success</h1>
        <p className="text-center text-2xl">
          We received your purchase request,
          <br /> we&apos;ll be in touch shortly!
        </p>
      </div>
    </Wrapper>
  );
};
export default SuccessPage;
