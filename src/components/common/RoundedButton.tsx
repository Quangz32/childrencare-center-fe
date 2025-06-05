export default function RoundedButton({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#0070F4] text-white px-5 py-2 rounded-full border-2 border-black 
      shadow-[1px_2px_0px_0px_#000000] font-bold ${className}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
