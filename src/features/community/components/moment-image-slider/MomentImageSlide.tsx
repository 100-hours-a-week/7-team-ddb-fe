import Image from 'next/image';

interface MomentImageSlideProps {
  imageUrl: string;
}

export function MomentImageSlide({ imageUrl }: MomentImageSlideProps) {
  return (
    <div className="relative h-92 w-92 overflow-hidden rounded-md bg-gray-100">
      <Image
        src={imageUrl}
        alt="moment image"
        width={368}
        height={368}
        className="pointer-events-none h-full w-full object-contain"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
