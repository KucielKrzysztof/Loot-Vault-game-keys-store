import { useParams } from "react-router-dom";
import FullBanner from "../../ui/FullBanner";
import { productList } from "../../assets/mockdata";
import PageSection from "../../ui/PageSection";
import { formatCurrency } from "../../utils/formatters";
import { ShoppingBag, ShoppingCart } from "lucide-react";

function ProductPage() {
  const { slug } = useParams();
  const product = productList.find((i) => i.slug === slug);

  if (!product)
    return <div className="pt-20 text-white">Product not found</div>;

  const {
    title,
    price,
    originalPrice,
    discount,
    platforms,
    region,
    genre,
    image,
    inStock,
    rating,
  } = product;

  return (
    <div className="bg-background relative min-h-screen w-full">
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
          <div className="bg-surface/10 grid grid-cols-1 gap-8 rounded-3xl p-8 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-4 text-white">
              <h1 className="text-4xl font-black tracking-tighter uppercase">
                {title}
              </h1>

              <div className="h-px w-full bg-white/10" />

              <div className="bg-background/60 mx-auto flex justify-center divide-x rounded-full p-5">
                <div className="px-2 text-center">platform</div>
                <div className="px-2 text-center">
                  {inStock ? "in stock" : "out of stock"}
                </div>
                <div className="px-2 text-center">{rating}</div>
              </div>

              <div className="flex justify-center gap-5">
                <div className="text-red-700 line-through">
                  ${formatCurrency(originalPrice)}
                </div>
                <div>${formatCurrency(price)}</div>
              </div>

              <div className="font-black">
                <button className="bg-primary rounded-full p-5 uppercase">
                  <ShoppingCart className="inline" /> <span>Add To Cart</span>
                </button>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </div>
  );
}

export default ProductPage;
