import React, { useEffect, useState } from "react";
import "./App.css";
import AnswerItem from "./components/AnswerItem/AnswerItem";
import Button from "./components/Button/Button";
import Result from "./components/Result/Result";

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
  {
    question: "Столица Австрии",
    answers: ["Вена", "Зальцбург", "Инсбурк", "Амстердам"],
    correctAnswer: "Вена",
  },
  {
    question: "Столица Аргентины",
    answers: ["Росарио", "Кордова", "Буэнос-Айрес", "Чили"],
    correctAnswer: "Буэнос-Айрес",
  },
  {
    question: "Столица Белорусии",
    answers: ["Брест", "Гомель", "Минск", "Витебск"],
    correctAnswer: "Минск",
  },
  {
    question: "Столица Болгарии",
    answers: ["София", "Верна", "Пловдив", "Косово"],
    correctAnswer: "София",
  },
];

const App = () => {
  const [showResult, setShowResult] = useState(false);
  const [correctAnswersCount, setCorrectAsnwersCount] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(7);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [data, setData] = useState([]);

  const url =
    "https://quize-57337-default-rtdb.europe-west1.firebasedatabase.app//questions/-N2kn8zrGM1n1B6xMRQd.json";
  // const requestData = async () => {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(DATA),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await response.json();
  //   return data;
  // };
  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };

  let correctAnswer;
  useEffect(() => {
    getData();
  }, []);

  if (data.length >= 1)
    correctAnswer = data[currentQuestionId].correctAnswer;

  const checkAnswerHandler = (answer) => {
    setCurrentAnswer(answer);
    if (answer === correctAnswer) {
      setCorrectAsnwersCount((state) => state + 1);
    }
  };

  const changeQuestionHandler = () => {
    if (currentQuestionId < data.length - 1) {
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
              totalAnswersCount={data.length}
            />
            <div className="action">
              <Button btnText={"Menu"} onClickHandler={reset} />
              <Button btnText={"Again"} onClickHandler={reset} />
            </div>
          </>
        ) : (
          <>
            {data.length > 0 && (
              <div className="question">
                <img src={data[currentQuestionId].img} />
                <p> {data[currentQuestionId].question}</p>
              </div>
            )}

            <ul>
              {data.length > 0 &&
                data[currentQuestionId].answers.map((item, index) => (
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
