import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const InputField = ({
  input,
  value,
  icon: Icon,
  onChange,
  toggleVisibility,
  showPassword,
}) => {
  const PassVisibilityIcon = showPassword ? RiEyeFill : RiEyeOffFill;

  return (
    <div className="relative my-8">
      <Icon
        size="1.2rem"
        className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-300"
      />
      <input
        onChange={onChange}
        value={value}
        type={input === 'Password' && !showPassword ? 'password' : 'text'}
        placeholder={input}
        id={input.toLowerCase()}
        className="w-full py-3 px-10 rounded-full outline-none focus:shadow-[0_0_0_4px_rgba(0,204,102,0.2)]"
      />
      {input === 'Password' && (
        <PassVisibilityIcon
          onClick={toggleVisibility}
          size="1.2rem"
          className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 cursor-pointer"
        />
      )}
    </div>
  );
};

export default InputField;
