import { productTable, productVariantTable } from "@/db/schema"
import Image from "next/image"
import Link from "next/link"

interface VariantSelectorProps {
  productVariant: typeof productVariantTable.$inferSelect & {
    product: typeof productTable.$inferSelect & {
      variants: (typeof productVariantTable.$inferSelect)[]
    }
  }
  variantId: string
}

export function VariantSelector({
  productVariant,
  variantId,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      {productVariant.product.variants.map((variant) => (
        <Link
          href={`/product/${productVariant.product.slug}/${variant.id}`}
          key={variant.id}
          className={
            variantId === variant.id
              ? "border-primary overflow-hidden rounded-lg border-2"
              : ""
          }
        >
          <Image
            src={variant.imageUrl}
            alt={variant.color}
            height={70}
            width={70}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  )
}
