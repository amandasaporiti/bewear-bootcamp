import { Header } from "@/components/common/header"
import { ProductItem } from "@/components/common/product-item"
import { db } from "@/db"
import { categoryTable, productTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  // category/slug=camisetas
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  })

  if (!category) {
    return notFound()
  }

  // camiseta-preta
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-6 px-5">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <div className="grid grid-cols-2 gap-4">
          {products &&
            products.map((product) => (
              <ProductItem
                product={product}
                key={product.id}
                className="max-w-full"
              />
            ))}
        </div>
      </div>
    </>
  )
}
