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

const features = [
  {
    name: "Documentation",
    description:
      "Read up on how Galleon operates, our optimistic governance model and contributor guidelines.",
    link: links.handbookLink,
    icon: ResourcesIcon,
  },
  {
    name: "Community Crew",
    description:
      "Join our thriving community and get involved in our many intiatives to earn governance power through $DBL.",
    link: links.discordLink,
    icon: CommunityIcon,
  },
  {
    name: "Technology",
    description:
      "We use our technology partner Set Protocol to create the most secure, battle-tested products in DeFi.",
    link: links.tokensets,
    icon: ApplicationIcon,
  },
  {
    name: "Decentralised",
    description:
      "Participate in Galleon proposals through on-chain voting mechanisms on Snapshot using held $DBL.",
    link: links.forumLink,
    icon: GovernanceIcon,
  },
  {
    name: "Products",
    description:
      "Explore our growing suite on on-chain products across Ethereum, Optimism, Avalanche & Polygon",
    link: links.dapp,
    icon: ProductsIcon,
  },
  {
    name: "Treasury",
    description:
      "Take a look into the treasury and organisation health as all financial activity is executed transparently.",
    link: links.treasury,
    icon: TreasuryIcon,
  },
];

const faqs = [
  {
    question: "What is our core mission?",
    answer: (
      <span>
        The core mission that Galleon and its contributors align themselves
        around is{" "}
        <span className="text-theme-sky">
          building, growing and maintaining best-in-class decentralised,
          on-chain structured products.
        </span>{" "}
        We create investment themes and strategies that appeal to retail and
        DeFi natives alike to make investing and capturing the upside of the
        crypto space as easy as one click. Major initiatives in the Galleon
        organisation that do not fit within our core mission come under the flag
        of a ‘Voyage’
      </span>
    ),
  },
  {
    question: "What are Galleon ‘Voyages’?",
    answer: (
      <span>
        Voyages are major initiatives and extensions of the Galleon
        organisation. They are independent workstreams outside of our core
        mission of creating decentralised structured products but instead
        benefit the DAO through revenue and treasury diversification,{" "}
        <span className="text-theme-sky">
          direct benefits to $DBL tokenomics
        </span>{" "}
        and exploration of the space to create a thriving, long-term aligned
        community.
      </span>
    ),
  },
  {
    question: "Why we are here?",
    answer: (
      <span>
        We fundamentally believe that blockchain technology is the greatest
        innovation of our time. It is set to drastically disrupt and improve
        industries and the ways people live, work, and play. In the process,
        significant opportunities and wealth are created. Unlike with previous
        revolutions, this time, the upside is available to the broader public
        instead of just the select few. Historically, the companies shaping our
        future only went public when much of the value had already accrued. Most
        of the time, attractive investment opportunities were reserved for
        entities with the largest capital.<br></br>
        <br></br>Crypto projects turn things upside down. They issue their
        tokens in the earliest stages. Individuals can choose to invest any
        large or small sum they want.{" "}
        <span className="text-theme-sky">
          We at Galleon are building innovative on-chain products that anyone in
          the World can access, regardless of wealth, race, religion, gender, or
          any other attribute. All one needs to do to optimize your long-term
          exposure to this powerful rising tide, is simply have an Ethereum
          address and a wallet.
        </span>
      </span>
    ),
  },
  {
    question: "How does governance work in the DAO?",
    answer: (
      <span>
        Galleon is governed ultimately by Doubloon (DBL) holders through Galleon
        Improvement Proposals (GIP) and a model called{" "}
        <a
          href="https://docs.galleon.community/dao/governance"
          target={"_blank"}
          className="text-theme-sky"
          rel="noreferrer"
        >
          {" "}
          optimistic governance.
        </a>
      </span>
    ),
  },
];

const Feature = () => {
  return (
    <div>
      {/* Feature section with grid */}
      <div className="relative bg-theme-oldlace border-t-2 border-theme-navy py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h3 className="mt-2 text-3xl font-bold font-morion text-theme-navy  sm:text-5xl">
            About our decentralised organisation
          </h3>
          <p className="mt-5 max-w-prose mx-auto text-xl text-theme-navy">
            Galleon is a guild of like-minded experienced and aspiring investor
            product methodologists aiming to research, design, and create
            best-in-class thematic, leverage and yield based structured products
            on-chain.
          </p>

          <div className="max-w-3xl mx-auto divide-y-2 pb-4 border-theme-navy border-l-2 pl-5  divide-theme-navy">
            <dl className="mt-6 space-y-6 divide-y divide-theme-navy">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-theme-navy">
                          <span className="font-medium text-xl text-theme-navy">
                            {faq.question}
                          </span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform text-theme=navy"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-lg text-left text-theme-navy">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-theme-oldlace px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center">
                          <a
                            href={feature.link}
                            className="hover:opacity-50"
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <img
                              src={feature.icon}
                              className="h-full w-full text-theme-white"
                              aria-hidden="true"
                            />
                          </a>
                        </span>
                      </div>
                      <h3 className="mt-8 text-2xl font-bold font-morion text-theme-navy hover:text-theme-copper">
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
  );
};

export default Feature;
