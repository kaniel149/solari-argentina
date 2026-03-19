import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
  className = '',
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedOnChange = useCallback(
    (() => {
      let timer: ReturnType<typeof setTimeout>;
      return (val: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => onChange(val), debounceMs);
      };
    })(),
    [onChange, debounceMs]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    debouncedOnChange(val);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full ps-10 pe-9 py-2.5 rounded-lg
          bg-zinc-900 border border-white/[0.09]
          text-sm text-zinc-200 placeholder:text-zinc-600
          focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/20
          transition-colors
        "
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute end-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
