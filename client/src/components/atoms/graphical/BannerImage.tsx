import Image from 'next/image'

interface BannerImage {
  src: string
  className?: string
  alt: string
}
export const BannerImage = ({
  src = '',
  alt = '',
  className = '',
}: BannerImage) => {
  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-md bg-brown-50 ${className}`}
    >
      <Image
        alt={alt}
        src={src}
        fill
        className="object-cover"
        draggable={false}
        sizes="100% 100%"
        priority={true}
      />
    </div>
  )
}
