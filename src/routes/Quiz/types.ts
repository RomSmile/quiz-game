export interface IQuestion {
  text: string;
  answers: {
    text: string;
    IsCorrect: boolean;
  }[];
  prize: number;
}

export interface IUserAnswer {
  answers: {
    isSelected: boolean;
    isCorrect: boolean;
  }[];
  finished: boolean;
}
