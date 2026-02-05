import AppButton from "../../../ui/AppButton";
import FullBanner from "../../../ui/FullBanner";
import getMobileAppBannerImg from "../../../assets/mobile-app.png";
import appleLogo from "../../../assets/apple-logo.png";
import googleStoreLogo from "../../../assets/google-store-logo.png";

function MobileAppBanner(): React.JSX.Element {
  return (
    <FullBanner className="h-[450px] md:h-[500px]">
      <FullBanner.Image src={getMobileAppBannerImg} alt="Mobile App" />
      <FullBanner.Overlay className="bg-linear-to-r from-black/80 to-transparent" />
      <FullBanner.Content>
        <div className="flex w-[60%] flex-col items-start space-y-4 sm:w-1/2 md:space-y-6">
          <h1 className="text-left text-xl leading-tight font-black text-white lg:text-5xl">
            Don't miss out on any offers with our App!
          </h1>
          <p className="text-left text-lg font-medium text-gray-200 lg:text-2xl">
            Receive discounts, notifications, and much more!
          </p>
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
            <AppButton
              subtitle="Download on the"
              title="App Store"
              /*  store="apple" */
              icon={
                <img
                  src={appleLogo}
                  alt="Apple"
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              }
            />
            <AppButton
              subtitle="Download on the"
              title="Google Play"
              /* store="google" */
              icon={
                <img
                  src={googleStoreLogo}
                  alt="Google Play"
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              }
            />
          </div>
        </div>
      </FullBanner.Content>
    </FullBanner>
  );
}

export default MobileAppBanner;
