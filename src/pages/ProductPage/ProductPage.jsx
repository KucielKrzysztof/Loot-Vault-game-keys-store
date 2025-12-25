import { useState } from "react";
import { useParams } from "react-router-dom";
import FullBanner from "../../ui/FullBanner";
import PageSection from "../../ui/PageSection";
import GameCard from "./components/GameCard";
import GameAbout from "./components/GameAbout";
import GameRequirements from "./components/GameRequirements";
import PageNotFound from "../PageNotFound/PageNotFound";
import { useProduct } from "../../Features/products/hooks/useProduct";
import FullPageLoader from "../../ui/FullPageLoader";

function ProductPage() {
  const { slug } = useParams();
  const { data: product, isPending, error } = useProduct(slug);
  const [showDescription, setShowDescription] = useState(false);

  if (error) return <PageNotFound />;
  if (isPending) return <FullPageLoader />;

  const { title, image } = product;

  return (
    <div className="bg-background relative h-full w-full">
      {/* BG BANNER */}
      <div className="absolute inset-0 z-0 h-[500px] w-full lg:h-[600px]">
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
