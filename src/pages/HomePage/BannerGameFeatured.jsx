function BannerGameFeatured({ image, onClick }) {
	return (
		<div
			onClick={onClick}
			className="mt-10 group relative w-full h-48 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 cursor-pointer transition-all duration-500 hover:shadow-primary/30"
		>
			<img src={image} alt="Featured promotion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

			<div className="absolute inset-0 bg-black opacity-40" />
			<div className="absolute bottom-1/3 right-30 flex flex-col items-end  uppercase">
				<h1 className="text-4xl font-sans font-black">Limited Offer!</h1>
				<h2 className="text-2xl font-sans font-bold">games up to -50%</h2>
			</div>
			<div className="absolute bottom-6 left-6">
				<span className="bg-primary px-4 py-2 rounded-full text-sm  text-white shadow-lg transition-colors duration-300 hover:cursor-pointer hover:bg-secondary ">
					Check Details
				</span>
			</div>
		</div>
	);
}

export default BannerGameFeatured;
