export interface FullScreenMessageProps {
  message: string;
}

export function FullScreenMessage({ message }: FullScreenMessageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center text-gray-500">{message}</div>
    </div>
  );
}
