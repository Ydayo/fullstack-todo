import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  labelName?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  labelName,
  ...props
}) => {
  return (
    <div className={`${containerClassName}`}>
      <label className={`${labelClassName}`}>
        {labelName ? labelName : props.name}
      </label>
      <input
        {...props}
        className={`${inputClassName} text-gray-500 shadow border py-2 px-3 rounded focus:outline-none`}
      />
    </div>
  );
};

export default InputField;
