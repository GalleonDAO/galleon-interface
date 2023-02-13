import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { classNames } from "utils";
import { faqs } from "constants/faqs";
import { features } from "constants/features";
import links from "constants/externalLinks";

const Feature = () => {
  return (
    <div>
      {/* Feature section with grid */}

      <div className="relative bg-[url('./assets/Frame.png')]   bg-contain bg-center bg-theme-pan-champagne border-t-2 border-theme-navy py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h3 className="mt-2 text-3xl font-bold font-morion text-theme-pan-navy  sm:text-5xl">
            Structured Products
          </h3>
          <div className="mt-12 mb-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-1 md:w-1/3 w-full lg:max-w-none">
            <div

              className="flex flex-col rounded-xl shadow-lg border-2 border-theme-navy overflow-hidden"
            >

              <div className="flex-1 bg-theme-pan-champagne p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-theme-pan-sky">
                    <a
                      target="_blank"
                      href={'https://medium.com/galleondao/galleon-structured-products-depreciation-looking-forward-8ba9e5fa1fa6'}
                      className="hover:underline"
                      rel="noreferrer"
                    >
                      {'Announcement'}
                    </a>
                  </p>
                  <a
                    target="_blank"
                    href={'https://medium.com/galleondao/galleon-structured-products-depreciation-looking-forward-8ba9e5fa1fa6'}
                    className="block mt-2"
                    rel="noreferrer"
                  >
                    <p className="text-xl  font-morion font-semibold text-theme-navy">
                      Galleon Structured Products Depreciation & Looking Forward
                    </p>
                    <p className="mt-3 text-base text-theme-navy">
                      {'The ETH Max Yield Index & Basis Yield ETH Index are depreciated, please read the full announcement for details.'}
                    </p>
                    <div className="my-8">
                      <div className="">
                        <div className="">
                          <div className="">
                            <a
                              href={'https://medium.com/galleondao/galleon-structured-products-depreciation-looking-forward-8ba9e5fa1fa6'}
                              target={"_blank"}
                              className="block  py-3 px-4  rounded-xl border-2 shadow border-theme-pan-navy hover:border-theme-champagne hover:text-theme-oldlace  bg-theme-pan-champagne hover:bg-theme-pan-navy text-theme-pan-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-champagne text-sm md:text-xl focus:ring-offset-theme-black "
                              rel="noreferrer"
                            >
                              Announcement
                            </a>
                            <a
                              href={links.dapp}
                              target={"_blank"}
                              className="block  py-3 px-4 mt-3  rounded-xl border-2 shadow border-theme-pan-navy hover:border-theme-champagne hover:text-theme-oldlace  bg-theme-pan-champagne hover:bg-theme-pan-navy text-theme-pan-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-champagne text-sm md:text-xl focus:ring-offset-theme-black "
                              rel="noreferrer"
                            >
                              Redeem Products
                            </a>
                          </div>

                         
                        </div>
                        <div className="relative">
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="w-full border-t border-theme-oldlace" />
                          </div>
                        </div>
          
                
                    
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>
       
      
        </div>
      </div>
    </div>
  );
};

export default Feature;
