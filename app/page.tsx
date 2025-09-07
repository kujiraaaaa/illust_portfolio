"use client"

import { StickyHeader } from "@/components/sticky-header"
import { FilterableGallery } from "@/components/filterable-gallery"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Instagram, ExternalLink } from "lucide-react"

// Sample data for galleries
const worksImages = [
  { id: "1", src: "/placeholder.svg?height=300&width=400", alt: "Character Design 1", category: "OMC" },
  { id: "2", src: "/placeholder.svg?height=300&width=400", alt: "Game Character", category: "OMC" },
  { id: "3", src: "/placeholder.svg?height=300&width=400", alt: "Poster Design", category: "フロンティアワークス" },
  {
    id: "4",
    src: "/placeholder.svg?height=300&width=400",
    alt: "Merchandise Art",
    category: "フロンティアファクトリー",
  },
  { id: "5", src: "/placeholder.svg?height=300&width=400", alt: "Commission Work", category: "Commission" },
  { id: "6", src: "/placeholder.svg?height=300&width=400", alt: "Digital Art", category: "らっかみ！" },
]

const galleryImages = [
  { id: "g1", src: "/placeholder.svg?height=300&width=400", alt: "Original Character", category: "創作 (Original)" },
  { id: "g2", src: "/placeholder.svg?height=300&width=400", alt: "Fan Art", category: "ファンアート (Fan Art)" },
  { id: "g3", src: "/placeholder.svg?height=300&width=400", alt: "Project Art", category: "企画 (Projects)" },
  { id: "g4", src: "/placeholder.svg?height=300&width=400", alt: "Licensed Work", category: "版権 (Licensed)" },
  { id: "g5", src: "/placeholder.svg?height=300&width=400", alt: "Fantasy Original", category: "創作 (Original)" },
  { id: "g6", src: "/placeholder.svg?height=300&width=400", alt: "Anime Fan Art", category: "ファンアート (Fan Art)" },
]

const workFilters = ["PBW", "Commission"]
const pbwFilters = [
  "OMC",
  "フロンティアワークス",
  "フロンティアファクトリー",
  "らっかみ！",
  "Pandora Party Project",
  "トミーウォーカー",
]
const galleryFilters = ["創作 (Original)", "企画 (Projects)", "版権 (Licensed)", "ファンアート (Fan Art)"]

export default function Home() {
  return (
    <div className="min-h-screen">
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
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <div className="text-center">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Motoyoshi Kujira"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">元義くじら (Motoyoshi Kujira)</h3>
              <p className="text-foreground leading-relaxed">
                イラストレーターとして、ポスター、グッズ、挿絵、ゲームイラストなどを手掛けています。趣味で同人活動やファンアートも描いています。
              </p>
              <p className="text-foreground leading-relaxed">
                As an illustrator, I create posters, merchandise, book illustrations, and game art. I also enjoy
                creating fan art and doujinshi as a hobby.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Works</h2>

          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center gap-4 mb-8">
              <Button variant="default">PBW</Button>
              <Button variant="outline">Commission</Button>
            </div>

            {/* PBW Section with sub-filters */}
            <div className="mb-8">
              <FilterableGallery
                images={worksImages.filter((img) => img.category !== "Commission")}
                filters={pbwFilters}
                defaultFilter="OMC"
                columns={3}
                showCopyright={true}
                copyrightText="このカテゴリに掲載している作品は元義くじらがクラウドゲームス（株）が運営するオーダーメイドＣＯＭにて製作した物です。作品の著作権はクラウドゲームス（株）が留保します。"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Gallery</h2>

          <div className="max-w-6xl mx-auto">
            <FilterableGallery
              images={galleryImages}
              filters={galleryFilters}
              defaultFilter="創作 (Original)"
              columns={3}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Contact</h2>

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
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Motoyoshi Kujira. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
