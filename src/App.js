import React, { useState } from "react";
import "./App.css";

const DATA = [
  {
    question: "Столица России",
    answers: ["Москва", "Пермь", "Рязань", "Казань"],
    correctAnswer: "Москва",
  },
  {
    question: "Столица Китая",
    answers: ["Пекин", "Гон Конг", "Кинг Конг", "Пхеньян"],
    correctAnswer: "Пекин",
  },
  {
    question: "Столица США",
    answers: ["Лос Анджелес", "Нью Йорк", "Вашингтон", "Детройт"],
    correctAnswer: "Вашингтон",
  },
  {
    question: "Столица Японии",
    answers: ["Токио", "Оттава", "Пекин", "Хиросима"],
    correctAnswer: "Токио",
  },
];

const AnswerItem = ({
  point,
  text,
  checkAnswerHandler,
  currentAnswer,
  correctAnswer,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onClickHandler = () => {
    if (!currentAnswer) {
      checkAnswerHandler(text);
      setIsChecked(true);
    }
  };
  let style;

  if (currentAnswer) {
    if (text === correctAnswer) {
      style = "yes";
    } else {
      style = isChecked ? "no" : "";
    }
  }

  return (
    <div className={`answer_item ${style}`} onClick={onClickHandler}>
      <p className="point">{point}</p>
      <p className="answer_text">{text}</p>
    </div>
  );
};

const Button = ({ onClickHandler, type, btnText }) => {
  return (
    <button onClick={onClickHandler} className={`next ${type}`}>
      {btnText}
    </button>
  );
};

const Result = ({ correctAnswersCount, totalAnswersCount }) => {
  return (
    <div>
      <p>{`Правильных ответов ${correctAnswersCount} из ${totalAnswersCount}`}</p>
    </div>
  );
};

const App = () => {
  const [showResult, setShowResult] = useState(false);
  const [correctAnswersCount, setCorrectAsnwersCount] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const correctAnswer = DATA[currentQuestionId].correctAnswer;
  console.log("render");
  const checkAnswerHandler = (answer) => {
    setCurrentAnswer(answer);
    if (answer === correctAnswer) {
      setCorrectAsnwersCount((state) => state + 1);
    }
  };

  const changeQuestionHandler = () => {
    if (currentQuestionId < DATA.length - 1) {
      setCurrentQuestionId((state) => state + 1);
      setCurrentAnswer(null);
    } else setShowResult(true);
  };

  const reset = () => {
    setShowResult(false);
    setCorrectAsnwersCount(0);
    setCurrentQuestionId(0);
    setCurrentAnswer(null);
  };

  const points = ["A", "B", "C", "D"];
  return (
    <div className="container">
      <div className="content">
        {showResult ? (
          <>
            <Result
              correctAnswersCount={correctAnswersCount}
              totalAnswersCount={DATA.length}
            />
            <div className="action">
              <Button btnText={"Again"} onClickHandler={reset} />
            </div>
          </>
        ) : (
          <>
            <div className="question">
              {DATA[currentQuestionId].question}
            </div>

            <ul>
              {DATA[currentQuestionId].answers.map((item, index) => (
                <AnswerItem
                  key={item}
                  text={item}
                  point={points[index]}
                  checkAnswerHandler={checkAnswerHandler}
                  currentAnswer={currentAnswer}
                  correctAnswer={correctAnswer}
                />
              ))}
            </ul>
            <div className="action">
              {currentAnswer && (
                <Button
                  btnText={"Next"}
                  onClickHandler={changeQuestionHandler}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
