import { FC } from "react";

type Icard = {
  title: string;
  para: string;
};

const Card: FC<Icard> = ({ title, para }) => {
  return (
    <div className="w-44 h-36 space-y-5">
      <h4>{title}</h4>
      <p>{para}</p>
    </div>
  );
};

export default Card;
