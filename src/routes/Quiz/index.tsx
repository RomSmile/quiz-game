import React, { useState, useMemo, useLayoutEffect } from "react";
import questions from "./questions.json";
import Hexagon from "@/routes/Quiz/components/Hexagon";
import { useNavigate } from "react-router-dom";
import "./style.scss";

interface IQuestion {
  text: string;
  answers: {
    text: string;
    IsCorrect: boolean;
  }[];
  prize: number;
}

interface IUserAnswer {
  answers: {
    isSelected: boolean;
    isCorrect: boolean;
  }[];
  finished: boolean;
}

const reversedQuestions = () => {
  const result: IQuestion[] = [];
  for (let i = questions.length - 1; i >= 0; i--) {
    result.push(questions[i]);
  }

  return result;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [openPrizes, setOpenPrizes] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer>({
    answers: questions[currentQuestionIndex].answers.map((answer) => ({
      isSelected: false,
      isCorrect: answer.IsCorrect,
    })),
    finished: false,
  });

  const currentQuestionObject: IQuestion = useMemo(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestionIndex !== 0) {
      setUserAnswer({
        ...userAnswer,
        answers: currentQuestion.answers.map((answer) => ({
          isCorrect: answer.IsCorrect,
          isSelected: false,
        })),
      });
    }
    return currentQuestion;
  }, [currentQuestionIndex]);

  const setAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setUserAnswer((state) => {
      state.answers[index].isSelected = event.target.checked;
      return { ...state };
    });
    if (userAnswer.answers[index].isCorrect) {
      setTimeout(() => {
        setUserAnswer({
          ...userAnswer,
          finished: true,
        });
        if (questions.length - 1 === currentQuestionIndex) {
          return navigate(
            `/finish?prize=${questions[questions.length - 1].prize}`,
          );
        }
      }, 1000);
    } else {
      setTimeout(() => {
        return navigate(
          `/finish?prize=${currentQuestionIndex === 0 ? 0 : questions[currentQuestionIndex - 1].prize}`,
        );
      }, 1000);
    }
  };

  useLayoutEffect(() => {
    if (userAnswer.finished) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1000);
    }
  }, [userAnswer.finished]);

  useLayoutEffect(() => {
    if (currentQuestionIndex !== 0) {
      setUserAnswer({
        answers: questions[currentQuestionIndex].answers.map((answer) => ({
          isSelected: false,
          isCorrect: answer.IsCorrect,
        })),
        finished: false,
      });
    }
  }, [currentQuestionIndex]);

  return (
    <div className="quiz-container">
      <button
        onClick={() => {
          setOpenPrizes(!openPrizes);
        }}
      >
        <img src={`images/${!openPrizes ? "Menu" : "Close"}.svg`} alt="menu" />
      </button>
      <div className="question-container">
        <h1>{currentQuestionObject.text}</h1>
        <div
          className={`
            answers-container
            answers-container--${userAnswer.finished && "finished"}
          `}
        >
          {userAnswer.answers.map((answer, index) => {
            return (
              <Hexagon
                key={`answer--${index}`}
                text={currentQuestionObject.answers[index].text}
                index={index}
                onChange={setAnswer}
                isSelected={answer.isSelected}
                isCorrect={answer.isCorrect}
                finished={userAnswer.answers.some(
                  (answer) => answer.isSelected,
                )}
                isPair={(index + 1) % 2 === 0}
                isAnswer={true}
              />
            );
          })}
        </div>
      </div>
      <div
        className={`
          present-container
          present-container--${!openPrizes && "not-show"}
        `}
      >
        <div className="content-container">
          {reversedQuestions().map((_question, index) => {
            return (
              <Hexagon
                key={`answer--${questions.length - 1 - index}`}
                text={questions[questions.length - 1 - index].prize}
                index={questions.length - 1 - index}
                isSelected={false}
                isCorrect={false}
                finished={true}
                isPair={false}
                isAnswer={false}
                currentQuestionIndex={currentQuestionIndex}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
