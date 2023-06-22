import Wrapper from "@/components/shared/Wrapper";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Wrapper>
      <div className="flex justify-center items-center w-full">
        <SignUp />
      </div>
    </Wrapper>
  );
}
