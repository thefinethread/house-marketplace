import ReactLoading from 'react-loading';

const Spinner = ({
  loadingText = true,
  color = '#0c6',
  height = '64px',
  width = '64px',
}) => {
  return (
    <div className={`h-full w-full flex flex-col justify-center items-center`}>
      <ReactLoading height={height} width={width} type="spin" color={color} />
      {loadingText && (
        <p className="mt-2 text-sm text-gray-400">loading... Please Wait</p>
      )}
    </div>
  );
};

export default Spinner;
