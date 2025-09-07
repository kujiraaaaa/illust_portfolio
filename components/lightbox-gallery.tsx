"use client"

import { useState } from "react"
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

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

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
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-full h-full max-h-[90vh] p-0 bg-black/90 border-0">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              <img
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
