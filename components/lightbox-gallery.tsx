"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category?: string
}

interface LightboxGalleryProps {
  images: GalleryImage[]
  columns?: number
  className?: string
}

export function LightboxGallery({ images, columns = 3, className = "" }: LightboxGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  const goToPrevious = () => setSelectedImage(selectedImage !== null ? (selectedImage > 0 ? selectedImage - 1 : images.length - 1) : null)
  const goToNext = () => setSelectedImage(selectedImage !== null ? (selectedImage < images.length - 1 ? selectedImage + 1 : 0) : null)

  // Esc/←/→キー対応
  useEffect(() => {
    if (selectedImage === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <>
      <div
        className={`grid gap-4 ${columns === 2 ? "grid-cols-1 md:grid-cols-2" : columns === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"} ${className}`}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="cursor-pointer group overflow-hidden rounded-lg bg-card shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-[300px] h-[300px] object-cover object-top group-hover:scale-105 transition-transform duration-300 mx-auto"
              style={{ objectPosition: "top center" }}
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in"
          onClick={closeLightbox}
          style={{ cursor: "zoom-out" }}
        >
          <div
            className="relative"
            onClick={e => e.stopPropagation()}
          >
            {/* ×ボタン */}
            <button
              className="absolute -top-4 -right-4 bg-white/80 hover:bg-white text-[#006bb8] rounded-full p-2 shadow-lg transition-colors"
              onClick={closeLightbox}
              aria-label="閉じる"
              style={{ zIndex: 10 }}
            >
              <X className="w-6 h-6" />
            </button>
            {/* 左右送りボタン（必要なら） */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-[#006bb8] rounded-full p-2 shadow-lg transition-colors"
                  onClick={e => { e.stopPropagation(); goToPrevious() }}
                  aria-label="前の画像"
                  style={{ zIndex: 10 }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-[#006bb8] rounded-full p-2 shadow-lg transition-colors"
                  onClick={e => { e.stopPropagation(); goToNext() }}
                  aria-label="次の画像"
                  style={{ zIndex: 10 }}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[80vh] h-auto w-auto rounded shadow-lg animate-zoom-in"
            />
          </div>
        </div>
      )}
    </>
  )
}
