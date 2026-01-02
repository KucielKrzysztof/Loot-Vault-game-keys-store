import Button from "../../../ui/Button";
import FullBanner from "../../../ui/FullBanner";

function TestimonialBanner() {
  return (
    <FullBanner className="my-10 h-auto py-16 md:h-[500px]">
      <FullBanner.Image
        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070"
        alt="Influencer Recommendation"
      />

      <FullBanner.Overlay className="bg-linear-to-r from-black via-black/80 to-transparent" />

      <FullBanner.Content className="mx-auto max-w-7xl justify-center px-6">
        <div className="animate-fade-in flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-20">
          <div className="flex shrink-0 flex-col items-center">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?u=pro-gamer-7"
                className="border-secondary shadow-secondary/20 h-32 w-32 rounded-full border-4 object-cover shadow-2xl md:h-48 md:w-48"
                alt="Famous Pro Player"
                loading="lazy"
              />
            </div>
            <div className="mt-6 flex flex-col items-center text-center">
              <span className="text-secondary text-xl leading-none font-black tracking-widest uppercase">
                Jack "NotREAL" Smith
              </span>
              <span className="mt-2 text-sm font-medium text-gray-400">
                World Champion & Content Creator
              </span>
            </div>
          </div>

          <div className="flex h-full flex-col items-center justify-center space-y-8 text-center md:items-start md:text-left">
            <p className="max-w-3xl text-2xl leading-tight font-medium text-white italic md:text-5xl">
              "This is hands down the most reliable place to get your keys. Fast
              delivery, secure payments, and unbeatable prices!"
            </p>

            <Button variant="secondary" className="hover:scale-110">
              Join our Discord Community
            </Button>
          </div>
        </div>
      </FullBanner.Content>
    </FullBanner>
  );
}

export default TestimonialBanner;
