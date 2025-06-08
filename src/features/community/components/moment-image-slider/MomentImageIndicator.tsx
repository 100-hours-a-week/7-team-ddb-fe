interface MomentImageIndicatorProps {
  total: number;
  current: number;
  className?: string;
}

export function MomentImageIndicator({
  total,
  current,
  className,
}: MomentImageIndicatorProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${
            index === current ? 'bg-white' : 'bg-white/50'
          }`}
        />
      ))}
    </div>
  );
}
