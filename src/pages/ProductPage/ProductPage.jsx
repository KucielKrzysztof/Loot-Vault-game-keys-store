import { useState } from "react";
import { useParams } from "react-router-dom";
import FullBanner from "../../ui/FullBanner";
import PageSection from "../../ui/PageSection";
import GameCard from "./components/GameCard";
import GameAbout from "./components/GameAbout";
import GameRequirements from "./components/GameRequirements";
import PageNotFound from "../PageNotFound/PageNotFound";
import { useProduct } from "../../Features/products/hooks/useProduct";
import ProductPageSkeleton from "./components/ProductPageSkeleton";
import SEO from "../../ui/SEO";

function ProductPage() {
  const { slug } = useParams();
  const { data: product, isPending, error } = useProduct(slug);
  const [showDescription, setShowDescription] = useState(false);

  if (error) return <PageNotFound />;
  if (isPending) return <ProductPageSkeleton />;

  const { title, price, image, platforms } = product;

  return (
    <div className="bg-background relative h-full w-full">
      <SEO
        title={`${title} - Only $${price}`}
        description={`Get your ${title} digital key on ${platforms?.join(", ")}. Instant delivery via Vault Store.`}
        image={image}
        type="product"
      />

      {/* BG BANNER */}
      <div className="absolute inset-0 z-0 h-125 w-full lg:h-150">
        <FullBanner>
          <FullBanner.Image src={image} alt={title} />
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
          <GameRequirements requirements={product.requirements} />
        </PageSection>
      </div>
    </div>
  );
}

export default ProductPage;
