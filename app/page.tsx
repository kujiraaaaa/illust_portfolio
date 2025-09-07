"use client"

import { useState, useEffect } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Instagram, ExternalLink, X, ArrowUp } from "lucide-react"
import { FilterableGallery } from "@/components/filterable-gallery"

const worksImages = [
  
  { id: "w1", src: "/images/works/works_001.webp", alt: "character art", category: "PBW" },
  { id: "w2", src: "/images/works/works_002.webp", alt: "character art", category: "PBW" },
  { id: "w3", src: "/images/works/works_003.webp", alt: "concept art", category: "PBW" },
  { id: "w4", src: "/images/works/works_004.webp", alt: "character art", category: "PBW" },
  { id: "w5", src: "/images/works/works_005.webp", alt: "character art", category: "PBW" },
  { id: "w6", src: "/images/works/works_006.webp", alt: "character art", category: "PBW" },
  { id: "w7", src: "/images/works/works_007.webp", alt: "character art", category: "PBW" },
  { id: "w8", src: "/images/works/works_008.webp", alt: "concept art", category: "PBW" },
  { id: "w9", src: "/images/works/works_009.webp", alt: "concept art", category: "PBW" },
  { id: "w10", src: "/images/works/works_010.webp", alt: "character art", category: "PBW" },
  { id: "w11", src: "/images/works/works_011.webp", alt: "character art", category: "PBW" },
  { id: "w12", src: "/images/works/works_012.webp", alt: "character art", category: "PBW" },
  { id: "w13", src: "/images/works/works_013.webp", alt: "concept art", category: "PBW" },
  { id: "w14", src: "/images/works/works_014.webp", alt: "character art", category: "PBW" },
  { id: "w15", src: "/images/works/works_015.webp", alt: "character art", category: "PBW" },
  { id: "w16", src: "/images/works/works_016.webp", alt: "character art", category: "PBW" },
  { id: "w17", src: "/images/works/works_017.webp", alt: "character art", category: "PBW" },
  { id: "w18", src: "/images/works/works_018.webp", alt: "group art", category: "PBW" },
  { id: "w19", src: "/images/works/works_019.webp", alt: "group art", category: "PBW" },

  { id: "c1", src: "/images/works/commission_001.webp", alt: "commission", category: "Commission" },
  { id: "c2", src: "/images/works/commission_002.webp", alt: "commission", category: "Commission" },
]

const galleryImages = [
  // 創作 (Original)
  { id: "g1", src: "/images/gallery/original_001.webp", alt: "オリジナルキャラクター", category: "創作 (Original)" },
  // ファンアート (Fan Art)
  { id: "g2", src: "/images/gallery/fanart_001.webp", alt: "ファンアート", category: "ファンアート (Fan Art)" },
  { id: "g19", src: "/images/gallery/fanart_002.webp", alt: "ファンアート", category: "ファンアート (Fan Art)" },
  { id: "g20", src: "/images/gallery/fanart_003.webp", alt: "ファンアート", category: "ファンアート (Fan Art)" },
  // 企画 (Projects)
  { id: "g3", src: "/images/gallery/projects_001.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g5", src: "/images/gallery/projects_002.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g6", src: "/images/gallery/projects_003.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g7", src: "/images/gallery/projects_004.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g8", src: "/images/gallery/projects_005.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g9", src: "/images/gallery/projects_006.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g10", src: "/images/gallery/projects_007.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g11", src: "/images/gallery/projects_008.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g12", src: "/images/gallery/projects_009.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g13", src: "/images/gallery/projects_010.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g14", src: "/images/gallery/projects_011.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g15", src: "/images/gallery/projects_012.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  { id: "g16", src: "/images/gallery/projects_013.webp", alt: "企画イラスト", category: "企画 (Projects)" },
  // 版権 (Licensed)
  { id: "g4", src: "/images/gallery/licensed_001.webp", alt: "版権イラスト", category: "版権 (Licensed)" },
  { id: "g17", src: "/images/gallery/licensed_002.webp", alt: "版権イラスト", category: "版権 (Licensed)" },
  { id: "g18", src: "/images/gallery/licensed_003.webp", alt: "版権イラスト", category: "版権 (Licensed)" },
]

const galleryFilters = ["企画 (Projects)", "創作 (Original)", "版権 (Licensed)", "ファンアート (Fan Art)"]

export default function Home() {
  const [activeWorkCategory, setActiveWorkCategory] = useState("PBW")
  const [lightboxImage, setLightboxImage] = useState<null | { src: string; alt: string }>(null)
  const [showTop, setShowTop] = useState(false)

  // スクロールで表示切替
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const filteredWorksImages = worksImages.filter((img) => img.category === activeWorkCategory)

  return (
    <div className="min-h-screen bg-[#f6f4f2]">
      {/* Background illustration with low opacity */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <StickyHeader />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg.webp?height=1080&width=1920')",
            backgroundPosition: "top",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Motoyoshi Kujira</h1>
          <p className="text-xl md:text-2xl text-balance">Illustrator Portfolio</p>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#006bb8]">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <div className="text-center">
              <img
                src="/avater.webp?height=300&width=300"
                alt="Motoyoshi Kujira"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#006bb8]">元義くじら (Motoyoshi Kujira)</h3>
              <p className="text-foreground leading-relaxed">
                イラストレーターとして、ポスター、グッズ、挿絵、ゲームイラストなどを手掛けています。趣味で同人活動やファンアートも描いています。
              </p>
              <p className="text-foreground leading-relaxed">
                As an illustrator, I create posters, merchandise, book illustrations, and game art. I also enjoy
                creating fan art and doujinshi as a hobby.
              </p>
              <div className="flex gap-4 flex-wrap">
                {/* 創作・企画アカウント */}
                <Button variant="outline" asChild className="flex items-center gap-1 px-3 py-2 h-10">
                  <a
                    href="https://x.com/kujiratentei"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="創作・企画アカウント（くじら）"
                    aria-label="創作・企画アカウント（くじら）"
                    className="flex items-center gap-1"
                  >
                    <X className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">くじら（創作・企画）</span>
                  </a>
                </Button>
                {/* 仕事告知用アカウント */}
                <Button variant="outline" asChild className="flex items-center gap-1 px-3 py-2 h-10">
                  <a
                    href="https://x.com/motoyoshi_kjr"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="仕事告知用（元義くじら）"
                    aria-label="仕事告知用（元義くじら）"
                    className="flex items-center gap-1"
                  >
                    <X className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">元義くじら（仕事告知）</span>
                  </a>
                </Button>
                {/* TRPG専用ポートフォリオ */}
                <Button
                  variant="outline"
                  asChild
                  className="flex items-center gap-1 px-3 py-2 h-10"
                >
                  <a
                    href="https://profile-kujira-trpg.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TRPGポートフォリオ"
                    aria-label="TRPGポートフォリオ"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="text-xs sm:text-sm">TRPGポートフォリオ</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#006bb8]">Works</h2>

          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={activeWorkCategory === "PBW" ? "default" : "outline"}
                onClick={() => setActiveWorkCategory("PBW")}
              >
                PBW
              </Button>
              <Button
                variant={activeWorkCategory === "Commission" ? "default" : "outline"}
                onClick={() => setActiveWorkCategory("Commission")}
              >
                Commission
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {filteredWorksImages.map((image) => (
                <Card key={image.id} className="overflow-hidden cursor-pointer">
                  <CardContent className="p-0">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-[300px] h-[300px] object-cover object-top transition-transform duration-300 hover:scale-105 mx-auto"
                      onClick={() => setLightboxImage({ src: image.src, alt: image.alt })}
                      style={{ cursor: "zoom-in", objectPosition: "top center" }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            {activeWorkCategory === "PBW" && (
              <div className="bg-[#fee3b3] p-4 rounded-lg text-sm text-center text-[#333] max-w-4xl mx-auto">
                <p>
                  このカテゴリに掲載している作品は、各社のコンテンツにおいて、私が制作を担当したものです。<br />著作権や利用に関するすべての権利は、各社が所有または留保しています。
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ライトボックス */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in"
          onClick={() => setLightboxImage(null)}
          style={{ cursor: "zoom-out" }}
        >
          <div
            className="relative"
            onClick={e => e.stopPropagation()}
          >
            {/* ×ボタン */}
            <button
              className="absolute -top-4 -right-4 bg-white/80 hover:bg-white text-[#006bb8] rounded-full p-2 shadow-lg transition-colors"
              onClick={() => setLightboxImage(null)}
              aria-label="閉じる"
              style={{ zIndex: 10 }}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[80vh] h-auto w-auto rounded shadow-lg animate-zoom-in"
            />
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#006bb8]">Gallery</h2>

          <div className="max-w-6xl mx-auto">
            <FilterableGallery
              images={galleryImages}
              filters={galleryFilters}
              defaultFilter="企画 (Projects)"
              columns={3}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#006bb8]">Contact</h2>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input id="name" placeholder="Enter your name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Enter your message" rows={6} />
                </div>

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#006bb8] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Motoyoshi Kujira. All rights reserved.</p>
        </div>
      </footer>

      {/* 最上部へ戻るボタン */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-[#006bb8] text-white rounded-full p-2 shadow-lg hover:bg-[#005299] transition-colors md:p-3"
          aria-label="トップへ戻る"
          style={{ fontSize: 18 }}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
