import { CheckIcon } from 'lucide-react';

interface HeaderCheckButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function HeaderCheckButton({
  onClick,
  disabled = false,
}: HeaderCheckButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="submit moment"
      className={`p-1 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'}`}
    >
      <CheckIcon className="h-6 w-6" />
    </button>
  );
}
