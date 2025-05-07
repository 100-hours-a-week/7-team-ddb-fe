interface SlideIndicatorProps {
  total: number;
  active: number;
}

export function SlideIndicator({ total, active }: SlideIndicatorProps) {
  return (
    <div className="flex w-full justify-center space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            index === active ? 'bg-primary w-4' : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}
