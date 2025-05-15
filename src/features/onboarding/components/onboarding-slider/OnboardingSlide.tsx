import Image from 'next/image';

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
      <div className="relative mb-6 h-64 w-full overflow-hidden rounded-md bg-gray-200">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="pointer-events-none object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <h2 className="heading-1 mb-5">{title}</h2>
      <p className="body-text max-w-md whitespace-pre-line">{description}</p>
    </div>
  );
}
