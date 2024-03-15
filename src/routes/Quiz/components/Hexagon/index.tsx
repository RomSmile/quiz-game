import { FC } from "react";
import { lettersArray } from "@/routes/Quiz/constants.ts";
import { IHexagon } from "./types.ts";
import "./style.scss";

const Hexagon: FC<IHexagon> = ({
  isCorrect,
  isSelected,
  finished,
  isPair,
  index,
  text,
  isAnswer,
  onChange,
  currentQuestionIndex,
}) => {
  return (
    <div
      className={`
        label-container
        label-container--${isPair && "pair"}
        label-container--${isSelected && !finished && "selected"}
        label-container--${isSelected && isCorrect && finished && "correct"}
        label-container--${isSelected && !isCorrect && finished && "wrong"}
        label-container--${finished && isAnswer && "disabled"}
        label-container--${isAnswer && !finished && "hover"}
        label-container--${isAnswer ? "small-line" : "big-line"}
        label-container--${!isAnswer && currentQuestionIndex === index && "active-prize"}
        label-container--${!isAnswer && (currentQuestionIndex as number) > index && "not-active-prize"}
      `}
    >
      <div className="line"></div>
      <label>
        <div
          className={`
            inside-wrapper
            inside-wrapper--${isSelected && "selected"}
            inside-wrapper--${isSelected && isCorrect && finished && "correct"}
            inside-wrapper--${isSelected && !isCorrect && finished && "wrong"}
          `}
        >
          <div className="text-wrapper">
            {isAnswer && <span>{lettersArray[index]}.</span>} {!isAnswer && "$"}
            {text}
          </div>
        </div>
        {isAnswer && (
          <input
            style={{ display: "none" }}
            disabled={finished}
            type={"checkbox"}
            checked={isSelected}
            onChange={(event) => {
              onChange && onChange(event, index);
            }}
          />
        )}
      </label>
      <div className="line"></div>
    </div>
  );
};

export default Hexagon;
