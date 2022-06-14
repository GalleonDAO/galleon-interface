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

const products = [
  {
    title: "ETH Maxy Yield Index",
    description:
      "ETHMAXY is the best leveraged $ETH liquid staking strategy in DeFi today, all within one tradable ERC20 token.",
    source:
      "https://github.com/GalleonDAO/galleon-tokenlist/blob/main/logos/ethmaxy.png?raw=true",
    link: links.dapp + "/ethmaxy",
    dashboard: "https://dune.com/galleondao/ETHMAXY-KPIs",
    active: true,
  },
  // {
  //   title: 'Basis Yield ETH Index',
  //   description:
  //     'BYE utilises Perpetual Protocol on Optimism to create a delta neutral position of ETH, offering a high yield based on funding rate',
  //   source:
  //     'https://github.com/GalleonDAO/galleon-tokenlist/blob/main/logos/BYE.png?raw=true',
  //   link: links.dapp + '/bye',
  //   active: true,
  // },
  // More files...
];

const Products = () => {
  return (
    <div className=" border-t-2 bg-theme-white  border-theme-navy lg:relative">
      <div className="lg:mx-auto lg:max-w-7xl  py-24">
        <h3 className="mt-2 text-3xl  font-bold font-morion text-theme-navy text-center  sm:text-5xl">
          Structured Products
        </h3>
        <p className="mt-5 pb-12 text-center  mx-auto text-xl text-theme-navy">
          One-click on-chain investment themes for leveraged, yield and
          diversified exposure.
        </p>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {products.map((product) => (
            <li key={product.title} className="relative">
              <a href={product.link} target={"_blank"} rel="noreferrer">
                <div className="group block w-full aspect-w-4 aspect-h-4">
                  <img
                    src={product.source}
                    alt="product logo"
                    className="object-cover group-hover:opacity-75"
                  />
                </div>
              </a>
              <p className="mt-6 block text-xl font-bold font-morion text-center text-theme-navy truncate pointer-events-none">
                {product.title}
              </p>
              <p className="block text-md font-lg text-center  text-theme-navy pointer-events-none">
                {product.description}
              </p>
              <div className="pt-2 justify-evenly text-center">
                <a
                  href={product.link}
                  target={"_blank"}
                  className="inline-flex py-2 px-4 rounded-2xl border-2 shadow border-theme-navy hover:border-theme-navy hover:text-theme-navy  bg-theme-navy hover:bg-theme-oldlace text-theme-oldlace focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
                  rel="noreferrer"
                >
                  Buy
                </a>
                <a
                  href={product.dashboard}
                  target={"_blank"}
                  className="inline-flex py-2 px-4 ml-2 rounded-2xl border-2 shadow border-theme-navy hover:border-black hover:text-theme-navy  bg-theme-copper hover:bg-theme-oldlace text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
                  rel="noreferrer"
                >
                  Analytics
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
