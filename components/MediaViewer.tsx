import Image from 'next/image'
import { useMemo } from 'react'

const MediaViewer = (props: { mediaType: 'IMAGE' | 'VIDEO'; src: string; size?: string; withBorder?: boolean }) => {
  const { mediaType, src, size, withBorder } = props

  const className = useMemo(
    () => (size ? size : 'w-[100px] h-[100px] rounded-lg') + ' object-contain ' + (withBorder ? 'm-1 border border-zinc-600' : ''),
    [size, withBorder]
  )

  const w = Number(className.split(' ')[0]?.replace('w-[', '')?.replace('px]', ''))
  const h = Number(className.split(' ')[1]?.replace('h-[', '')?.replace('px]', ''))

  return mediaType === 'IMAGE' ? (
    <Image src={src} alt='' className={className} width={Number.isNaN(w) ? 1000 : w} height={Number.isNaN(h) ? 1000 : h} priority unoptimized />
  ) : mediaType === 'VIDEO' ? (
    <video src={src} controls className={className} />
  ) : null
}

export default MediaViewer
