import Wrapper from "@/components/shared/Wrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Wrapper>
      <div className="flex justify-center items-center w-full">
        <SignIn />
      </div>
    </Wrapper>
  );
}
