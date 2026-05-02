'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

interface HeroVideoPanelProps {
  videoSrc: string
  openingImageSrc?: string
  imageSrc: string
  imageAlt: string
}

export default function HeroVideoPanel({ videoSrc, openingImageSrc, imageSrc, imageAlt }: HeroVideoPanelProps) {
  const [videoVisible, setVideoVisible] = useState(!openingImageSrc)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleVideoCanPlay() {
    if (openingImageSrc) {
      setTimeout(() => setVideoVisible(true), 800)
    }
  }

  return (
    <>
      {/* Opening image (locomotive) — shown first, fades out when video is ready */}
      {openingImageSrc && (
        <Image
          src={openingImageSrc}
          alt={imageAlt}
          fill
          className={`object-cover transition-opacity duration-1000 ${videoVisible ? 'opacity-0' : 'opacity-100'}`}
          priority
        />
      )}

      {/* Video — fades in after opening image */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={handleVideoCanPlay}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoVisible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Fallback static image (when no opening image and video hasn't loaded) */}
      {!openingImageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover -z-10"
          priority
        />
      )}
    </>
  )
}
