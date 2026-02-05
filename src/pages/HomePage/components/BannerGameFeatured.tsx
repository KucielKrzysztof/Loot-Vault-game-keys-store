import Button from "../../../ui/Button";

interface BannerGameFeaturedProps {
  image: string;
  onClick: () => void;
}

function BannerGameFeatured({
  image,
  onClick,
}: BannerGameFeaturedProps): React.JSX.Element {
  return (
    <div
      onClick={onClick}
      className="group shadow-primary/10 hover:shadow-primary/30 relative mt-10 h-48 w-full cursor-pointer overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 md:h-80 lg:h-96"
    >
      <img
        src={image}
        alt="Featured promotion"
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="absolute bottom-1/3 flex flex-col items-end pl-3 uppercase md:right-30 md:pl-0">
        <h1 className="font-sans text-xl font-black md:text-4xl">
          Limited Offer!
        </h1>
        <h2 className="font-sans text-lg font-bold md:text-2xl">
          games up to -50%
        </h2>
      </div>
      <div className="absolute bottom-6 left-6">
        <Button variant="primary">Check Details</Button>
      </div>
    </div>
  );
}

export default BannerGameFeatured;
