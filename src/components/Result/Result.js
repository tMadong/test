const Result = ({ correctAnswersCount, totalAnswersCount }) => {
  return (
    <div className="result">
      <img src="https://country-quiz-iota.vercel.app/assets/undraw_winners_ao2o%202.04e61641.svg" />
      <div className="result_content">
        <p className="result_title">Результат:</p>
        <p className="results">
          Правильных ответов
          <span className="result_value">
            {" " + correctAnswersCount + " "}
          </span>
          из
          {" " + totalAnswersCount}
        </p>
      </div>
    </div>
  );
};

export default Result;
