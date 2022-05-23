const Button = ({ onClickHandler, type, btnText }) => {
  return (
    <button onClick={onClickHandler} className={`next ${type}`}>
      {btnText}
    </button>
  );
};

export default Button