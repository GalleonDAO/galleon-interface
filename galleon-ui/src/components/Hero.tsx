import Navigation from "components/Navigation";
import { Fragment } from "react";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import crewBackground from "assets/brand/crew-bg.png";
import { ChevronDownIcon } from "@heroicons/react/outline";
import ResourcesIcon from "assets/brand/Resources-Icon.png";
import CommunityIcon from "assets/brand/Community-Icon.png";
import AboutIcon from "assets/brand/About-Icon.png";
import ApplicationIcon from "assets/brand/Application-Icon.png";
import GovernanceIcon from "assets/brand/Governance-Icon.png";
import ProductsIcon from "assets/brand/Products-Icon.png";
import TreasuryIcon from "assets/brand/Treasury-Icon.png";
import GalleonLogo from "assets/brand/Union-Logo-Light.png";

import ResourcesIconDark from "assets/brand/Resources-Icon-Dark.png";
import CommunityIconDark from "assets/brand/Community-Icon-Dark.png";
import AboutIconDark from "assets/brand/About-Icon-Dark.png";
import ApplicationIconDark from "assets/brand/Application-Icon-Dark.png";
import GovernanceIconDark from "assets/brand/Governance-Icon-Dark.png";
import ProductsIconDark from "assets/brand/Products-Icon-Dark.png";
import TreasuryIconDark from "assets/brand/Treasury-Icon-Dark.png";
import { classNames } from "utils";
import links from "constants/externalLinks";

const Hero = () => {
  return (
    <div>
      <div className="pt-10  bg-theme-black sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden bg-[url('./assets/ship-bg-04.png')] bg-cover bg-no-repeat bg-center  pb-10 bg-opacity-100  min-h-screen">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="py-24">
                <h1 className="mt-4 pb-3 text-4xl font-morion tracking-tight font-extrabold text-theme-pan-navy sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="pb-3  bg-clip-text text-transparent bg-gradient-to-r from-theme-pan-navy to-theme-pan-navy sm:pb-5">
                   Galleon
                  </span>
                  {/* <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-theme-pan-champagne to-theme-oldlace sm:pb-5">
                    Through DeFi & NFTs
                  </span> */}
                </h1>
                <p className="text-3xl text-theme-pan-navy sm:text-3xl lg:text-lg xl:text-3xl">
                  A grand decentralised voyage.
                </p>
                <div className="mt-8 sm:mt-8">
                  <div className="sm:max-w-xl sm:mx-auto lg:mx-0">
                    <div className="sm:flex">
                      {/* <div className="min-w-0">
                        <a
                          href={links.dapp}
                          target={"_blank"}
                          className="block w-1/2 md:w-full py-3 px-4 mb-10 rounded-xl border shadow border-theme-pan-navy hover:border-theme-pan-navy hover:text-theme-oldlace  hover:bg-theme-pan-champagne text-theme-pan-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-pan-champagne text-sm md:text-xl focus:ring-offset-theme-black "
                          rel="noreferrer"
                        >
                          Redeem Products
                        </a>
                      </div> */}

                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                          href={links.discordLink}
                          target={"_blank"}
                          className="block w-1/2 md:w-full border-2 py-3 px-4 mb-10 rounded-xl shadow border-theme-pan-navy hover:border-theme-pan-navy hover:text-theme-pan-navy   text-theme-pan-navy hover:bg-theme-pan-champagne  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-pan-champagne text-sm md:text-xl focus:ring-offset-theme-black "
                          rel="noreferrer"
                        >
                          Join the Crew
                        </a>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t-2 border-theme-pan-navy" />
                      </div>
                    </div>
                    <div className="relative flex pb-5 pt-5 justify-start">
                      <p className="pr-2 text-3xl font-bold font-morion text-theme-pan-navy">
                        Voyages 
                      </p>
                    </div>
                    <a
                      href={links.cursedPirates}
                      target={"_blank"}
                      className="flex  items-center    text-theme-pan-navy bg-transparent p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-theme-pan-navy"
                      rel="noreferrer"
                    >
                      <img
                        src="/jollyroger-transp.png"
                        className="ml-2 w-16 h-16 p-1 rounded-xl  border-theme-pan-navy text-theme-pan-navy"
                        aria-hidden="true"
                      />
                      <span className="px-5 md:px-3 py-2 ml-3  border-theme-pan-navy border-2 hover:border-theme-pan-navy 2xl:border-0 2xl:hover:border-2 text-sm 2xl:text-xl hover:bg-theme-pan-champagne 2xl:bg-transparent text-theme-pan-navy 2xl:text-theme-pan-navy 2xl:hover:text-theme-pan-navy hover:text-theme-pan-navy  leading-5 tracking-wide rounded-xl">
                        Cursed Pirates{" "}
                        <ChevronRightIcon className="2xl:w-8 2xl:h-8 w-4 h-4 -translate-y-0.5 2xl:-translate-y-1 inline-flex"></ChevronRightIcon>
                      </span>
                    </a>
                    {/* <a
                      href={links.cursedFund}
                      target={"_blank"}
                      className="flex  items-center    text-theme-pan-navy bg-transparent p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-theme-pan-navy"
                      rel="noreferrer"
                    >
                      <img
                        src="/skull.png"
                        className="ml-2 p-2 w-16 h-16 rounded-xl  border-theme-pan-navy text-theme-pan-navy"
                        aria-hidden="true"
                      />
                      <span className="px-5 md:px-3 py-2 ml-3  border-theme-pan-navy border-2 hover:border-theme-pan-navy 2xl:border-0 2xl:hover:border-2 text-sm 2xl:text-xl hover:bg-theme-pan-champagne 2xl:bg-transparent text-theme-pan-navy 2xl:text-theme-pan-navy 2xl:hover:text-theme-pan-navy hover:text-theme-pan-navy  leading-5 tracking-wide rounded-xl">
                        Cursed Fund{" "}
                        <ChevronRightIcon className="2xl:w-8 2xl:h-8 w-4 h-4 -translate-y-0.5 2xl:-translate-y-1 inline-flex"></ChevronRightIcon>
                      </span>
                    </a> */}
                    <p className="mt-3 text-sm text-theme-pan-navy sm:mt-4"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-xl sm:px-6 lg:max-w-none lg:px-0">
                {/* <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src={shipBackground}
                    alt=""
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
