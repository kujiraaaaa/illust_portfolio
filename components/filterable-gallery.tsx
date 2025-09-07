"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LightboxGallery } from "./lightbox-gallery"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

interface FilterableGalleryProps {
  images: GalleryImage[]
  filters: string[]
  defaultFilter?: string
  columns?: number
  className?: string
  showCopyright?: boolean
  copyrightText?: string
}

export function FilterableGallery({
  images,
  filters,
  defaultFilter,
  columns = 3,
  className = "",
  showCopyright = false,
  copyrightText = "",
}: FilterableGalleryProps) {
  const [activeFilter, setActiveFilter] = useState(defaultFilter || filters[0])

  const filteredImages = images.filter((image) => image.category === activeFilter)

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className="text-sm"
          >
            {filter}
          </Button>
        ))}
      </div>

      <LightboxGallery images={filteredImages} columns={columns} />

      {showCopyright && copyrightText && activeFilter && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground leading-relaxed">{copyrightText}</p>
        </div>
      )}
    </div>
  )
}
