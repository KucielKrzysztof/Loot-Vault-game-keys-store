import { useParams } from "react-router-dom";
import FullBanner from "../../ui/FullBanner";
import { productList } from "../../assets/mockdata";
import PageSection from "../../ui/PageSection";

import { useState } from "react";
import Button from "../../ui/Button";
import GameCard from "./components/GameCard";
import GameAbout from "./components/GameAbout";
import GameRequirements from "./components/GameRequirements";

function ProductPage() {
  const { slug } = useParams();
  const product = productList.find((i) => i.slug === slug);
  const [showDescription, setShowDescription] = useState(false);

  if (!product)
    return <div className="pt-20 text-white">Product not found</div>;

  const { title, image } = product;

  return (
    <div className="bg-background relative w-full">
      {/* BG BANNER */}
      <div className="absolute inset-0 z-0 h-[500px] w-full lg:h-[600px]">
        <FullBanner>
          <FullBanner.Image src={image} alt={title} />
          <FullBanner.Overlay />
        </FullBanner>
      </div>
      {/* MAIN CONTENT */}
      <div className="relative z-10 mt-50">
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
