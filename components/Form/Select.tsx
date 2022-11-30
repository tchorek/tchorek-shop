import { useFormContext } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  options: string[];
}

export const Select = ({ name, label, options }: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <>
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>

      <select
        className="relative w-full border-gray-200 rounded-t-md focus:z-10 sm:text-sm"
        id={name}
        autoComplete={label}
        {...register(name)}
      >
        {options &&
          options.map((option, index) => <option key={index}>{option}</option>)}
      </select>
    </>
  );
};
