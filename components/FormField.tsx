import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errors?: string[];
}

export function FormField({
  label,
  name,
  errors,
  ...inputProps
}: FormFieldProps) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        aria-describedby={errorId}
        aria-invalid={errors && errors.length > 0}
        className="mt-1 w-full rounded border p-2"
        {...inputProps}
      />
      <div
        id={errorId}
        aria-live="polite"
        className="mt-1 text-sm text-red-600"
      >
        {errors?.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
