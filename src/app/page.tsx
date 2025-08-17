import { Brands } from "@/components/common/brands"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { db } from "@/db"
import { productTable } from "@/db/schema"
import { desc } from "drizzle-orm"
import Image from "next/image"
import { CategorySelector } from "../components/common/category-selector"
import { ProductList } from "../components/common/product-list"

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  })

  const categories = await db.query.categoryTable.findMany({})

  const newlyProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  })
  return (
    <>
      <Header />
      <div className="space-y-6">
        {/* Banner principal */}
        <div className="px-5">
          <Image
            src="/banner.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Marcas parceiras */}
        <div className="px-5">
          <Brands />
        </div>

        {/* Lista de Produtos mais vendidos */}
        <ProductList products={products} title="Mais vendidos" />

        {/* Categorias */}
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        {/* Banner secundário */}
        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Autêntico"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Novos produtos */}
        <ProductList title="Novos produtos" products={newlyProducts} />

        <Footer />
      </div>
    </>
  )
}
