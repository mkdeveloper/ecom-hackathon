import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  qty: number;
}
const QtyBtn = (props: Props) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        className="w-12 h-12 border-gray-600 font-extrabold text-2xl border rounded-full flex justify-center items-center"
        onClick={props.onDecrease}
      >
        {props.qty === 1 ? <BsFillTrashFill className="w-8" /> : "-"}
      </button>
      <p>{props.qty}</p>
      <button
        className="w-12 h-12 border-gray-600 font-extrabold text-2xl border rounded-full"
        onClick={props.onIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QtyBtn;
