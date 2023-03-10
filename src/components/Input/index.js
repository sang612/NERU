import { css, cx } from '@emotion/css';
import { useEffect, useState } from 'react';
import { validateOkuchyQ } from '@/utils/nerusokuQ';

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
      />
      <div className={`${!messageError && 'hidden'} text-error text-xs my-2 whitespace-nowrap`}>{messageError}</div>
    </div>
  );
};

export const SurveyInput = ({
  placeholder,
  className,
  name,
  type,
  value,
  disabled,
  height,
  border = 'border-2',
  max,
  min,
  numberOfQuestion,
  onChange = () => {},
  setIsErrorMessage,
}) => {
  const [validationMessage, setValidationMessage] = useState(false);
  const [preMessage, setPreMessage] = useState('');
  const handleBlur = (e) => {
    setValidationMessage(numberOfQuestion ? validateOkuchyQ[numberOfQuestion](e.target.value) : '');
    if (numberOfQuestion) {
      if (validateOkuchyQ[numberOfQuestion](e.target.value)) {
        setPreMessage(validateOkuchyQ[numberOfQuestion](e.target.value));
      }
    }
    if (onChange) {
      onChange(e);
    }
  };
  useEffect(() => {
    if (validationMessage) {
      setIsErrorMessage((prev) => [...prev, validationMessage]);
    } else {
      if (!preMessage) return;
      setIsErrorMessage((prev) => prev.filter((message) => !message.includes(preMessage)));
    }
  }, [validationMessage]);

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
        onChange={handleBlur}
        disabled={disabled}
        max={max}
        min={min}
      />
      <div className={`${!validationMessage && 'hidden'} text-error text-xs my-2 whitespace-nowrap absolute`}>
        {validationMessage}
      </div>
    </div>
  );
};
