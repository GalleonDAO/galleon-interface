import { ChevronRightIcon } from "@heroicons/react/outline";
import GalleonLogo from "assets/dbl_revamp.png";
import links from "constants/externalLinks";
import { features } from "constants/features";

const Doubloon = () => {
  return (
    <div className=" relative bg-[url('./assets/Frame.png')] bg-contain bg-left bg-theme-pan-champagne border-t-2 border-theme-navy py-16">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="relative">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-4">
            <img className="mt-10 mb-10" src={GalleonLogo} alt="" />
          </div>
        </div>
        <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-xl sm:px-6 lg:px-0 lg:pb-10 lg:pt-14 lg:max-w-none">
            <div>
              <h3 className="mt-2 text-4xl md:text-5xl font-bold font-morion text-theme-pan-navy  sm:text-5xl">
                Doubloon ($DBL)
              </h3>
              <p className="mt-6 text-xl font-medium text-theme-pan-navy">
                Galleon is a decentralized organisation with operational
                decisions transparently executed by the will of Doubloon holders. Doubloon holders partake in Galleons optimistic governance
                model to balance efficiency and decentralisation within the DAO. Doubloon is either earned through contribution to the DAO via
                professional services or swapped through Uniswap on the Arbitrum
                network.
              </p>

              <div className="mt-10">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 ">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className=" border-2 border-theme-navy shadow-lg bg-theme-pan-champagne rounded-xl"
                    >
                      <div className="flow-root pt-6  px-6 pb-6">
                        <div className="">
                          
                          <h3 className=" text-xl font-bold font-morion text-theme-navy hover:text-theme-copper">
                            <a
                              href={feature.link}
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              {feature.name}{" "}
                              <ChevronRightIcon className="w-6 h-6 -translate-y-0.5 inline-flex"></ChevronRightIcon>
                            </a>
                          </h3>
                          <p className="mt-5 text-lg text-theme-navy">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doubloon;
