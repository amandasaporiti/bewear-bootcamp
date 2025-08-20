import { VariantSelector } from "@/app/product-variant/[slug]/[variantId]/components/variant-selector"
import { Header } from "@/components/common/header"
import { ProductList } from "@/components/common/product-list"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { productTable, productVariantTable } from "@/db/schema"
import { formatCentsToBRL } from "@/lib/utils"
import { eq } from "drizzle-orm"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

interface ProductProps {
  params: Promise<{ slug: string; variantId: string }>
}

export default async function ProductPage({ params }: ProductProps) {
  const { slug, variantId } = await params

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.id, variantId),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  })

  if (!productVariant) return notFound()

  // Pegar todos os produtos da mesma categoria

  const recommendedProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  })

  console.log(recommendedProducts)

  // const filteredRecommendedProducts = recommendedProducts.filter(product => product.variants[] !== variantId)

  // Colocar uma borda na variant selecionada

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-8 px-5">
        {/* Image */}
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          height={0}
          width={0}
          className="h-auto w-full rounded-md object-cover"
        />

        {/* Variantes */}
        <VariantSelector
          variantId={variantId}
          productVariant={productVariant}
        />

        {/* Informações sobre o produto */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-black">
              {productVariant.product.name}
            </h3>
            <p className="text-sm text-[#656565]">
              {productVariant.product.description}
            </p>
          </div>
          <strong className="text-lg font-semibold text-black">
            {formatCentsToBRL(productVariant.priceInCents)}
          </strong>
        </div>

        {/* Quantidade */}
        <div className="flex h-12 w-40 items-center justify-center gap-4 rounded-xl border-[1.6px] border-[#F1F1F1]">
          <Button size="icon" variant="ghost">
            <Minus />
          </Button>
          <p>1</p>
          <Button size="icon" variant="ghost">
            <Plus />
          </Button>
        </div>

        {/* Botões de Ação */}

        <div className="flex flex-col gap-3">
          <Button variant="outline" className="h-12 rounded-full">
            Adicionar à sacola
          </Button>
          <Button className="h-12 rounded-full">Comprar agora</Button>
        </div>

        {/*  */}
        <p className="text-sm">
          Elevate your casual style with a top that gives comfortable fleece a
          polished look. This spacious, button-down shacket offers clean, modern
          lines and is perfect by itself or as a layering piece. Our premium,
          smooth-on-both-sides fleece feels warmer and softer than ever while
          keeping the same lightweight build you love.
        </p>

        {/* Produtos recomendados */}
        <ProductList
          products={recommendedProducts}
          title="Você também pode gostar"
        />
      </div>
    </>
  )
}

// /camiseta-nike/variantId
