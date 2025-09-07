"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function StickyHeader() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="text-xl font-bold text-primary">Boo-Hoo</div>

        {/* モバイル用ハンバーガー */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <span className="block w-6 h-0.5 bg-[#006bb8] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#006bb8] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#006bb8]"></span>
        </button>

        {/* PC用メニュー */}
        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant="ghost"
            onClick={() => scrollToSection("about")}
            className="text-foreground hover:text-primary"
          >
            About
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("works")}
            className="text-foreground hover:text-primary"
          >
            Works
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("gallery")}
            className="text-foreground hover:text-primary"
          >
            Gallery
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("contact")}
            className="text-foreground hover:text-primary"
          >
            Contact
          </Button>
        </nav>
      </div>

      {/* モバイルメニュー */}
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
          <a
            href="#about"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <a
            href="#works"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Works
          </a>
          <a
            href="#gallery"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
