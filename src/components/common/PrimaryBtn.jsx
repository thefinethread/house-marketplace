const PrimaryBtn = ({ children, isActive, onMutate, value, id }) => {
  const activeClass = 'bg-accent text-white';

  return (
    <button
      onClick={onMutate}
      value={value}
      id={id}
      className={`px-11 py-3 font-bold rounded-2xl ${
        isActive ? activeClass : 'bg-white'
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
