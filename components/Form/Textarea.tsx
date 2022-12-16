import { useFormContext } from 'react-hook-form';

interface TextareaProps {
  name: string;
  label: string;
  sr?: boolean;
}

export const Textarea = ({ name, label, sr }: TextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <>
      <label
        className={sr ? 'sr-only' : 'block text-xs font-medium text-gray-700'}
        htmlFor={name}
      >
        {label}
      </label>

      <textarea
        className={sr ? 'w-full border-gray-200 shadow-sm sm:text-sm' : ''}
        placeholder={sr ? label : ''}
        id={name}
        {...register(name)}
      ></textarea>
      <span role="alert" className="text-red-500 text-sm">
        {error?.message as string}
      </span>
    </>
  );
};
