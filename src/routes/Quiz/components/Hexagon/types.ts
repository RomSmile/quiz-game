import React from "react";

export interface IHexagon {
  text: string | number;
  index: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  isSelected: boolean;
  isCorrect: boolean;
  finished: boolean;
  isPair: boolean;
  isAnswer: boolean;
  currentQuestionIndex?: number;
}
