import insto from "assets/instos.png";
import media from "assets/media.png";

export default function Investors() {
  return (
    <div className="relative bg-[url('./assets/Frame.png')]   bg-contain bg-center bg-theme-pan-champagne border-t-2 border-theme-navy py-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h3 className="mt-2 text-3xl   font-bold font-morion text-theme-navy text-center  sm:text-5xl">
          Investors
        </h3>
        <p className="mt-5 text-center  border-b-2 w-[40rem] pb-4 border-theme-navy  mx-auto text-xl text-theme-navy">
          Supported by the best industry VCs & Angels.
        </p>
        <div className="grid grid-cols-1  gap-0.5 md:grid-cols-1">
          <div className="col-span-1  flex justify-center py-8 px-8 ">
            <img className="px-24  rounded-xl" src={insto} alt="investors" />
          </div>
        </div>
        <h3 className="mt-2 text-3xl  font-bold font-morion text-theme-navy text-center  sm:text-5xl">
          Media
        </h3>
        <p className="mt-5 text-center  border-b-2 w-[40rem] pb-4 border-theme-navy mx-auto text-xl text-theme-navy">
          Our products have made waves across the biggest crypto outlets.
        </p>
        <div className="grid grid-cols-1 gap-0.5 md:grid-cols-1">
          <div className="col-span-1 flex justify-center py-8 px-8 ">
            <img className="px-24  rounded-xl" src={media} alt="media" />
          </div>
        </div>
      </div>
    </div>
  );
}
