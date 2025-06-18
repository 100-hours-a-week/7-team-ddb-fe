interface MomentImageSlideProps {
  imageUrl: string;
}

export function MomentImageSlide({ imageUrl }: MomentImageSlideProps) {
  return (
    <div className="relative h-92 w-92 overflow-hidden rounded-md bg-gray-100">
      <img
        src={imageUrl}
        alt="moment image"
        className="pointer-events-none h-full w-full object-contain"
      />
    </div>
  );
}
