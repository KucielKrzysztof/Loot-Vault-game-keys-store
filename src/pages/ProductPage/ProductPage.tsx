import { useState } from "react";
import { useParams } from "react-router-dom";
import FullBanner from "../../ui/FullBanner";
import PageSection from "../../ui/PageSection";
import GameCard from "./components/GameCard";
import GameAbout from "./components/GameAbout";
import GameRequirements, {
  type RequirementsData,
} from "./components/GameRequirements";
import PageNotFound from "../PageNotFound/PageNotFound";
import { useProduct } from "../../Features/products/hooks/useProduct";
import ProductPageSkeleton from "./components/ProductPageSkeleton";
import SEO from "../../ui/SEO";
import type { Product } from "../../Features/products/types/product";

function ProductPage(): React.JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isPending, error } = useProduct(slug || "");
  const [showDescription, setShowDescription] = useState<boolean>(false);

  if (error || (!isPending && !product)) return <PageNotFound />;
  if (isPending || !product) return <ProductPageSkeleton />;

  const { title, price, image, platforms } = product as Product;

  const platformsList = Array.isArray(platforms)
    ? platforms.join(", ")
    : "Digital";
  const displayImage = image || "/vault_logo.png";

  return (
    <div className="bg-background relative h-full w-full">
      <SEO
        title={`${title} - Only $${price}`}
        description={`Get your ${title} digital key on ${platformsList}. Instant delivery via Vault Store.`}
        image={displayImage}
        type="product"
      />

      {/* BG BANNER */}
      <div className="absolute inset-0 z-0 h-125 w-full lg:h-150">
        <FullBanner>
          <FullBanner.Image src={displayImage} alt={title} />
          <FullBanner.Overlay className="bg-black/30 backdrop-blur-md" />
        </FullBanner>
      </div>
      {/* MAIN CONTENT */}
      <div className="relative z-10 pt-50">
        <PageSection>
          <GameCard product={product} />
        </PageSection>

        <PageSection>
          <GameAbout
            product={product}
            setShowDescription={setShowDescription}
            showDescription={showDescription}
          />
        </PageSection>

        <PageSection>
          <GameRequirements
            requirements={product.requirements as unknown as RequirementsData}
          />
        </PageSection>
      </div>
    </div>
  );
}

export default ProductPage;
