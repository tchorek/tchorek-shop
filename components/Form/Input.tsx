import { useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
}

export const Input = ({ name, label }: InputProps) => {
  console.log(useFormContext);
  console.log(label);
  // const {
  //   register,
  //   formState: { errors },
  // } = useFormContext();

  // const error = errors[name];

  return (
    <>
      {/* <label className="mb-1 block text-sm text-gray-600" htmlFor={name}>
        {label}
      </label>

      <input
        className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
        type="text"
        id={name}
        {...register(name)}
      />
      <span role="alert" className="text-red-500 text-sm">
        {error?.message as string}
      </span> */}
    </>
  );
};
