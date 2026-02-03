import GamesGrid from "../../ui/GamesGrid";
import FullBanner from "../../ui/FullBanner";
import BannerGameFeatured from "./components/BannerGameFeatured";
import PageSection from "../../ui/PageSection";
import TestimonialBanner from "./components/TestimonialBanner";
import MobileAppBanner from "./components/MobileAppBanner";
import FAQ from "./components/FAQ";
import CategoryGrid from "../../ui/CategoryCard/CategoryGrid";
import Button from "../../ui/Button";
import { useHomePageProducts } from "./hooks/useHomePageProducts";
import SEO from "../../ui/SEO";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const {
    trending,
    loadingTrending,
    recommended,
    loadingRecommended,
    bestsellers,
    loadingBestsellers,
  } = useHomePageProducts();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <SEO
        title="Best Digital Game Keys"
        description="Buy your favorite game keys instantly and securely. Minecraft, Baldur's Gate 3 and more!"
      />

      {/* HOME BANNER */}
      <FullBanner>
        <FullBanner.Image src="/banner.png" alt="Home" />
      </FullBanner>

      {/* FEATURED BANNER BANNER */}
      <PageSection>
        <BannerGameFeatured
          image="/featured.jpg"
          onClick={() => navigate("/product/elden-ring")}
        />
      </PageSection>

      {/* Trending games grid */}
      <PageSection>
        <GamesGrid games={trending} isLoading={loadingTrending}>
          <GamesGrid.Header to="/products">Trending</GamesGrid.Header>
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
        <GamesGrid games={recommended} isLoading={loadingRecommended}>
          <GamesGrid.Header to="/products">Recommended</GamesGrid.Header>
          <GamesGrid.List />
        </GamesGrid>
      </PageSection>

      {/* TESTIMONIAL BANNER */}
      <TestimonialBanner />

      {/* BESTSELLERS games grid  */}
      <PageSection>
        <GamesGrid games={bestsellers} isLoading={loadingBestsellers}>
          <GamesGrid.Header to="/products">Bestsellers</GamesGrid.Header>
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
