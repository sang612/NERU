import { css, cx } from '@emotion/css';

export const Input = ({
  placeholder,
  className,
  name,
  type,
  value,
  onChange = () => {},
  validate = () => {},
  messageError = '',
  disabled,
  height,
  border = 'border-2',
  max,
  min,
  onKeyDown,
  onPaste,
  defaultValue
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
          disabled && 'bg-disabled border-none text-secondary'
        } w-full outline-none ${className} ${border} ${height ? height : 'h-14 xsm:h-16'} ${
          messageError ? 'border-error' : 'border-primary'
        } border-solid rounded-md shadow-sm pl-2 font-normal`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={validate}
        disabled={disabled}
        max={max}
        min={min}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        defaultValue={defaultValue}
      />
      <div className={`${!messageError && 'hidden'} text-error text-xs my-2 whitespace-nowrap`}>
        {messageError}
      </div>
    </div>
  );
};

export const SurveyInput = ({
  placeholder,
  children,
  className,
  name,
  type,
  value,
  disabled,
  height,
  border = 'border-2',
  onChange,
  id,
  max,
  defaultValue,
  register,
  validationMessage,
  min,
  onPaste,
  onKeyPress,
}) => {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };
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
          disabled && 'bg-disabled border-none text-secondary'
        } w-full outline-none ${className} ${border} ${height ? height : 'h-14 xsm:h-16'} ${
          validationMessage ? 'border-error' : 'border-primary'
        } border-solid rounded-md shadow-sm pl-2 font-normal`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={defaultValue}
        disabled={disabled}
        max={max}
        min={min}
        id={id}
        onPaste={onPaste}
        onKeyPress={onKeyPress}
        {...register(id)}
      />
      <div className="text-sm font-normal text-error">{children}</div>
    </div>
  );
};
