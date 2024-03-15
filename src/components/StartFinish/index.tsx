import { FC, ReactNode } from "react";
import { LinkButton } from "@/components";
import "./style.scss";

const StartFinish: FC<{ titleComponent: ReactNode; linkText: string }> = ({
  titleComponent,
  linkText,
}) => {
  return (
    <div className="page-container">
      <div className="page">
        <img className="page__image" src="images/hand.svg" alt="like" />
        <div className="page__content">
          <h1>{titleComponent}</h1>
          <LinkButton href={"/quiz"} text={linkText} />
        </div>
      </div>
    </div>
  );
};

export default StartFinish;
