import ReactLoading from 'react-loading';

const Spinner = () => {
  return (
    <div className="fixed left-0 w-full flex flex-col justify-center items-center h-full bg-[rgba(0,0,0,0.1)] ">
      <ReactLoading type="spin" color="#0c6" />
      <p className="mt-2 text-sm text-gray-500">loading... Please Wait</p>
    </div>
  );
};

export default Spinner;
