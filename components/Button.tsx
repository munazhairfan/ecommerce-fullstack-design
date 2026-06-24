import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void; // Optional: for click actions
}

export default function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={twMerge(
        "bg-blue-600 text-white font-medium px-3 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 active:scale-95 transition-all text-sm",
        className
      )}
    >
      {text}
    </button>
  );
}