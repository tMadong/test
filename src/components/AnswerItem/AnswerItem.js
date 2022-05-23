import { useState } from "react";

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

export default AnswerItem;
