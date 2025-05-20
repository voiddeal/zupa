interface ButtonProps {
  value: string
  className?: string
  onClick: () => void
}

export default function Button({ value, className, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-60 py-2 text-2xl bg-teal-600 text-white rounded-xl shadow-[0px_4px_0px_rgba(0,0,0,0.5)] shadow-teal-800 cursor-pointer hover:bg-teal-500 active:translate-y-1 active:shadow-none active:bg-teal-700 transition-all ${
        className ? className : ""
      }`}
    >
      {value}
    </button>
  )
}
