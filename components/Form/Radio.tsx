import { useFormContext } from 'react-hook-form';

interface RadioProps {
  name: string;
  value: number;
}

export const Radio = ({ name, value }: RadioProps) => {
  const { register } = useFormContext();

  return (
    <>
      <input
        type="radio"
        value={value}
        id={`${name}-${value}`}
        className="peer hidden"
        {...register(name)}
      />

      <label
        htmlFor={`${name}-${value}`}
        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
      >
        <p className="text-sm font-medium">{value}</p>
      </label>
    </>
  );
};
