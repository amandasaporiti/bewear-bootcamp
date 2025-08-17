import Image from "next/image"

const brands = [
  { name: "Nike", imageUrl: "/assets/nike-logo.svg" },
  { name: "Adidas", imageUrl: "/assets/adidas-logo.svg" },
  { name: "Puma", imageUrl: "/assets/puma-logo.svg" },
  { name: "New Balance", imageUrl: "/assets/new-balance-logo.svg" },
  { name: "Converse", imageUrl: "/assets/converse-logo.svg" },
  { name: "Polo", imageUrl: "/assets/polo-logo.svg" },
  { name: "Zara", imageUrl: "/assets/zara-logo.svg" },
]

export function Brands() {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold">Marcas Parceiras</h2>
      <div className="flex w-full gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          // Card
          <div
            key={brand.name}
            className="flex-col items-center justify-center gap-3"
          >
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border-[1.6px] border-[#F1F1F1]">
              <Image src={brand.imageUrl} alt={brand.name} fill />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
