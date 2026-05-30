import Image from 'next/image'
import { API_URL } from '@/utils/main'
import { cn } from '@/lib/utils'

export const getImageUrl = (src: string | null | undefined): string => {
  if (!src) return '/placeholder.png'
  if (src.startsWith('http')) return src
  if (src.startsWith('/uploads')) return `${API_URL}${src}`
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`
  if (normalizedSrc.startsWith('/uploads')) return `${API_URL}${normalizedSrc}`
  return `${API_URL}/uploads/${src}`
}

interface OptimizedImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

export function OptimizedImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
  onError,
}: OptimizedImageProps) {
  const imageUrl = getImageUrl(src)

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={cn('object-cover', className)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={onError}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={cn('object-cover', className)}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={onError}
    />
  )
}

export const PreviewImage = ({ url }: { url: string | null | File }) => {
  const imageSrc =
    url instanceof File
      ? URL.createObjectURL(url)
      : url ? getImageUrl(url) : "/placeholder.png";

  return (
    <Image
      src={imageSrc}
      alt="Preview"
      width={150}
      height={100}
      className="mt-3 rounded object-cover"
      sizes="150px"
    />
  )
}

export default OptimizedImage;