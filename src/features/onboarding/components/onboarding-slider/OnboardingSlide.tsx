interface OnboardingSlideProps {
  imageUrl: string;
  title: string;
  description: string;
}

export function OnboardingSlide({
  imageUrl,
  title,
  description,
}: OnboardingSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 text-center">
      <div id={imageUrl} className="mb-6 h-64 w-full rounded-md bg-gray-200" />
      <h2 className="heading-1 mb-5">{title}</h2>
      <p className="body-text max-w-md whitespace-pre-line">{description}</p>
    </div>
  );
}
