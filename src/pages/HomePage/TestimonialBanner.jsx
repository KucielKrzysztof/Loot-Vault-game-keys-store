import FullBanner from "../../ui/FullBanner";

function TestimonialBanner() {
	return (
		<FullBanner className="h-auto py-16 md:h-[500px] my-10">
			<FullBanner.Image
				src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070"
				alt="Influencer Recommendation"
			/>

			<FullBanner.Overlay className="bg-linear-to-r from-black via-black/80 to-transparent" />

			<FullBanner.Content className="justify-center max-w-7xl mx-auto px-6">
				<div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20 animate-fade-in">
					<div className="flex flex-col items-center shrink-0">
						<div className="relative">
							<img
								src="https://i.pravatar.cc/150?u=pro-gamer-7"
								className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-secondary shadow-2xl shadow-secondary/20 object-cover"
								alt="Famous Pro Player"
							/>
						</div>
						<div className="flex flex-col items-center mt-6 text-center">
							<span className="text-secondary font-black text-xl uppercase tracking-widest leading-none">Jack "NotREAL" Smith</span>
							<span className="text-gray-400 font-medium text-sm mt-2 ">World Champion & Content Creator</span>
						</div>
					</div>

					<div className="flex flex-col items-center md:items-start justify-center h-full text-center md:text-left space-y-8">
						<p className="text-2xl md:text-5xl font-medium text-white italic leading-tight max-w-3xl">
							"This is hands down the most reliable place to get your keys. Fast delivery, secure payments, and unbeatable prices!"
						</p>

						<button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-secondary hover:text-white transition-all transform hover:scale-105 shadow-xl">
							Join our Discord Community
						</button>
					</div>
				</div>
			</FullBanner.Content>
		</FullBanner>
	);
}

export default TestimonialBanner;
