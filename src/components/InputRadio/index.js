export const InputRadio = ({
  name,
  id,
  value,
  onChange,
  checked,
  text,
  className,
}) => {
  return (
    <div
      className={`w-full h-16 outline-[2px] border-primary border-solid border-2 rounded-md flex items-center ${className}`}
    >
      <label
        htmlFor={id}
        className="radio-label flex items-center w-full h-full hover:cursor-pointer"
      >
        <input
          className="radio-input m-0 invisible peer"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          defaultChecked={checked}
        />
        <span className="border-[#C3C4C6] peer-checked:border-[#C3C4C6] peer-checked:border-solid peer-checked:border-[3.5px] peer-checked:after:opacity-100 cursor-pointer w-[29px] h-[29px] border-[3.5px] border-solid rounded-full inline-block relative after:content-[''] after:w-[17px] after:h-[17px] after:bg-[#50C3C5] after:absolute after:rounded-full after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:opacity-0 after:transition-opacity after:duration-300" />
        <h5 className="ml-[16px]">{text}</h5>
      </label>
    </div>
  );
};
