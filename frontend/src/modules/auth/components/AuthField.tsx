const inputClass =
  'bg-white border border-brand-300 text-gray-900 text-xs rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-1.5 md:p-2.5';

interface AuthFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export function AuthField({ label, id, type, value, onChange, placeholder, autoComplete }: AuthFieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-xs font-medium text-brand-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </div>
  );
}
