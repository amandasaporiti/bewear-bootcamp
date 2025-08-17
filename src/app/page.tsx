import { Header } from "@/components/common/header"
import { db } from "@/db"
import Image from "next/image"
import { ProductList } from "./auth/components/product-list"

export default async function Home() {
  const products = await db.query.productTable.findMany({
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

        {/* Lista de Produtos mais vendidos */}
        <ProductList products={products} title="Mais vendidos" />

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
      </div>
    </>
  )
}
