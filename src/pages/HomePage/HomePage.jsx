import { productList } from "../../assets/mockdata";
import GamesGrid from "../../ui/GamesGrid";
import FullBanner from "../../ui/FullBanner";
import BannerGameFeatured from "./BannerGameFeatured";
import PageSection from "../../ui/PageSection";
import TestimonialBanner from "./TestimonialBanner";
import MobileAppBanner from "./MobileAppBanner";
import FAQ from "./FAQ";
import CategoryGrid from "../../ui/CategoryCard/CategoryGrid";
import Button from "../../ui/Button";

function HomePage() {
  const placeholderURL =
    "https://gaming-cdn.com/images/products/16007/orig/elden-ring-shadow-of-the-erdtree-edition-shadow-of-the-erdtree-edition-pc-game-steam-europe-cover.jpg?v=1718975409";

  return (
    <div className="flex flex-col items-center">
      {/* HOMER BANNER */}
      <FullBanner>
        <FullBanner.Image src="/banner.png" alt="Home" />
      </FullBanner>

      {/* FEATURED BANNER BANNER */}
      <PageSection>
        <BannerGameFeatured image={placeholderURL} />
      </PageSection>

      {/* Trending games grid */}
      <PageSection>
        <GamesGrid games={productList} isLoading={false}>
          <GamesGrid.Header to="#">Trending</GamesGrid.Header>
          <GamesGrid.List />
        </GamesGrid>
      </PageSection>

      {/* CATEGORY GIRD */}
      <PageSection>
        <CategoryGrid />
      </PageSection>

      {/* HERO SECTION  */}
      <FullBanner>
        <FullBanner.Image src={placeholderURL} alt="Promo" />
        <FullBanner.Overlay className="bg-linear-to-r from-black/90 to-transparent" />
        <FullBanner.Content>
          <h1 className="text-6xl font-black">Limited Time Offer</h1>
          <p>Grab Elden Ring with 50% Discount!</p>
          <Button variant="primary">Check now</Button>
        </FullBanner.Content>
      </FullBanner>

      {/* RECOMMENDED games grid  */}
      <PageSection>
        <GamesGrid games={productList.slice(0, 3)} isLoading={false}>
          <GamesGrid.Header to="#">Recommended</GamesGrid.Header>
          <GamesGrid.List />
        </GamesGrid>
      </PageSection>

      {/* TESTIMONIAL BANNER */}
      <TestimonialBanner />

      {/* BESTSELLERS games grid  */}
      <PageSection>
        <GamesGrid games={productList.slice(0, 9)} isLoading={true}>
          <GamesGrid.Header to="#">Bestsellers</GamesGrid.Header>
          <GamesGrid.List />
        </GamesGrid>
      </PageSection>
      {/* categories section */}

      {/* GET  MOBIEL APP SECTION  */}
      <MobileAppBanner />
      <PageSection>
        <FAQ />
      </PageSection>
    </div>
  );
}

export default HomePage;
