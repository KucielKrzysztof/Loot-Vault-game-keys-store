import GamesGrid from "../../ui/GamesGrid";
import FullBanner from "../../ui/FullBanner";
import BannerGameFeatured from "./components/BannerGameFeatured";
import PageSection from "../../ui/PageSection";
import TestimonialBanner from "./components/TestimonialBanner";
import MobileAppBanner from "./components/MobileAppBanner";
import FAQ from "./components/FAQ";
import CategoryGrid from "../../ui/CategoryCard/CategoryGrid";
import Button from "../../ui/Button";
import { useProducts } from "../../Features/products/hooks/useProducts";

function HomePage() {
  const { isPending, products, error } = useProducts();

  if (error) return <p className="text-white">Error Loading data!</p>;

  return (
    <div className="flex flex-col items-center">
      {/* HOME BANNER */}
      <FullBanner>
        <FullBanner.Image src="/banner.png" alt="Home" />
      </FullBanner>

      {/* FEATURED BANNER BANNER */}
      <PageSection>
        <BannerGameFeatured
          image="/featured.jpg"
          onClick={console.log("todo")}
        />
      </PageSection>

      {/* Trending games grid */}
      <PageSection>
        <GamesGrid games={products} isLoading={isPending}>
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
        <FullBanner.Image src="/featured.jpg" alt="Promo" />
        <FullBanner.Overlay className="bg-linear-to-r from-black/90 to-transparent" />
        <FullBanner.Content>
          <h1 className="text-6xl font-black">Limited Time Offer</h1>
          <p>Grab Elden Ring with 50% Discount!</p>
          <Button variant="primary">Check now</Button>
        </FullBanner.Content>
      </FullBanner>

      {/* RECOMMENDED games grid  */}
      <PageSection>
        <GamesGrid games={products?.slice(0, 3)} isLoading={isPending}>
          <GamesGrid.Header to="#">Recommended</GamesGrid.Header>
          <GamesGrid.List />
        </GamesGrid>
      </PageSection>

      {/* TESTIMONIAL BANNER */}
      <TestimonialBanner />

      {/* BESTSELLERS games grid  */}
      <PageSection>
        <GamesGrid games={products?.slice(0, 9)} isLoading={isPending}>
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
