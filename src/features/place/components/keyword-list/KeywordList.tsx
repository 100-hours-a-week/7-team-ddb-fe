export interface KeywordListProps {
  keywords: string[];
}

export function KeywordList({ keywords }: KeywordListProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="text-label rounded-full bg-gray-100 px-2.5 py-0.5"
        >
          #{keyword}
        </span>
      ))}
    </div>
  );
}
