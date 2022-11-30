import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  sr?: boolean;
  rb?: string;
}

export const Input = ({ name, label, sr, rb }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  const error = errors[name];

  return (
    <>
      <label
        className={sr ? "sr-only" : "block text-xs font-medium text-gray-700"}
        htmlFor={name}
      >
        {label}
      </label>

      <input
        className={
          sr
            ? `relative w-full border-gray-200 focus:z-10 sm:text-sm ${rb}`
            : "w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
        }
        type="text"
        placeholder={sr ? label : ""}
        id={name}
        {...register(name)}
      />
      <span role="alert" className="text-red-500 text-sm">
        {error?.message as string}
      </span>
    </>
  );
};
