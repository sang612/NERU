import { css, cx } from '@emotion/css';

export const Input = ({
  placeholder, className,
  name,
  type,
  value,
  onChange = () => {},
  validate = () => {},
  messageError = '',
  disabled,
  height,
  border = 'border-2',
  max
}) => {
  return (
    <div
      className={cx(
        'mb-4 w-full',
        css`
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `
      )}
    >
      <input
        className={`${
          disabled && "bg-disabled border-none text-secondary"
        } w-full outline-none ${className} ${border} ${height ? height : "h-14 xsm:h-16"} ${
          messageError ? "border-error" : "border-primary"
        } border-solid rounded-md shadow-sm pl-2 font-normal`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={validate}
        disabled={disabled}
        max={max}
      />
      <div className={`${!messageError && 'hidden'} text-error text-xs my-2`}>{messageError}</div>
    </div>
  );
};
