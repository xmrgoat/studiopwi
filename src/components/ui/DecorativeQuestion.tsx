type Props = { className?: string };

export default function DecorativeQuestion({ className }: Props) {
  const dots: { cx: number; cy: number }[] = [];
  const cols = 6;
  const rows = 8;
  const spacing = 18;
  const startX = 14;
  const startY = 170;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ cx: startX + c * spacing, cy: startY + r * spacing });
    }
  }

  return (
    <svg
      viewBox="0 0 120 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Question mark — arc and hook */}
      <path
        d="M 22 62 C 22 18 98 2 98 52 C 98 88 58 100 58 140"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Question mark — dot */}
      <circle cx="58" cy="168" r="10" fill="currentColor" />

      {/* Thin horizontal rule */}
      <line
        x1="14"
        y1="152"
        x2="120"
        y2="152"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />

      {/* Dot grid — fills the lower portion */}
      {dots.map(({ cx, cy }) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill="currentColor" opacity="0.35" />
      ))}
    </svg>
  );
}
