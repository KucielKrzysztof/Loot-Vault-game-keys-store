function FullBanner({ children, className = "h-[400px] md:h-[600px] overflow-hidden" }) {
	return <section className={`relative w-full  ${className}`}>{children}</section>;
}

function BannerImage({ src, alt }) {
	return <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />;
}

function BannerOverlay({ className = "bg-black/50" }) {
	return <div className={`absolute inset-0 ${className}`} />;
}

function BannerContent({ children, className = "items-start justify-center" }) {
	return <div className={`relative h-full max-w-7xl mx-auto px-6 flex flex-col ${className}`}>{children}</div>;
}

FullBanner.Image = BannerImage;
FullBanner.Overlay = BannerOverlay;
FullBanner.Content = BannerContent;

export default FullBanner;
