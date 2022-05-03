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

const features = [
  {
    name: "Documentation",
    description:
      "Read up on how Galleon operates, our optimistic governance model and contributor guidelines.",
    link: "https://docs.galleon.community",
    icon: ResourcesIcon,
  },
  {
    name: "Community Crew",
    description:
      "Join our thriving community and get involved in our many intiatives to earn governance power through $DBL.",
    link: "https://discord.gg/galleondao",
    icon: CommunityIcon,
  },
  {
    name: "Technology",
    description:
      "We use our technology partner Set Protocol to create the most secure, battle-tested products in DeFi.",
    link: "https://tokensets.com",
    icon: ApplicationIcon,
  },
  {
    name: "Decentralised",
    description:
      "Participate in Galleon proposals through on-chain voting mechanisms on Snapshot using held $DBL.",
    link: "https://court.galleon.community",
    icon: GovernanceIcon,
  },
  {
    name: "Products",
    description:
      "Explore our growing suite on on-chain products across Ethereum, Optimism, Avalanche & Polygon",
    link: "https://app.galleon.community",
    icon: ProductsIcon,
  },
  {
    name: "Treasury",
    description:
      "Take a look into the treasury and organisation health as all financial activity is executed transparently.",
    link: "https://arbiscan.io/address/0x366C6aA72f717743FaEEdCaeF2b4dE8ec9589399",
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
          className="text-theme-sky" rel="noreferrer"
        >
          {" "}
          optimistic governance.
        </a>
      </span>
    ),
  },
];

const workstreams = [
  {
    title: "Product",
    answer: (
      <div className="">
        Within the product workstream, you’ll be responsible for guaranteeing
        the success of new products, this includes making strategic decisions
        based on market and competitor analyses.<br></br>
        <br></br>
        <span className="font-semibold text-theme-sky">
          What you can expect:
        </span>
        <ul className="list-disc pl-5" role="list">
          <li>
            Identifying early-stage product eligible market trends and
            narratives.
          </li>
          <li>
            Liaising with Engineering as to the feasibility of potential product
            concepts.
          </li>
          <li>
            Planning and designing, acting as a guide of an idea from conception
            through to execution.
          </li>
          <li>
            Helping to bridge the gap among departments, enabling the team to
            successfully bring your product(s) to market.
          </li>
          <li>Maintenance and Performance review of existing products</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Growth",
    answer: (
      <div className="">
        Understanding our customer’s needs and having empathy with their pain
        points is vital in the Growth workstream. Continuously driving to
        improve current processes and take Galleon and its products to the next
        level, while not being afraid of failure.<br></br>
        <br></br>
        <span className="font-semibold text-theme-sky">
          What you can expect:
        </span>
        <ul className="list-disc pl-5" role="list">
          <li>
            Always striving to promote Galleon’s brand, vision, and values.
          </li>
          <li>
            Identifying DeFi collaboration opportunities and helping to build
            strategic partnerships.
          </li>
          <li>
            Engaging with potential listing partners and wallet providers.
          </li>
          <li>
            Responsibility for product launch campaigns across all communication
            channels.
          </li>
          <li>
            Identifying opportunities for incentivising new user adoption and
            growth.
          </li>
          <li>
            Tracking AUM and monitoring products versus competitor offerings.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Business Development",
    answer: (
      <div className="">
        Our Business Development workstream is aligned in parallel with Growth
        and includes implementing strategic partnerships, cross-over
        collaborative products as well as utilizing market fit to help build
        Galleon's reputation both internally and externally.<br></br>
        <br></br>
        <span className="text-theme-sky font-semibold">It will include:</span>
        <ul className="list-disc pl-5" role="list">
          <li>
            Beneficially utilizing Galleon Investor networks and resources to
            further the growth of Galleon.
          </li>
          <li>
            Building healthy and engaging relationships with existing DeFi
            protocols and builders.
          </li>
          <li>
            Represent Galleon as a Business Development contributor in the wider
            DeFi space.
          </li>
          <li>
            Actively contribute to and help manage the in-house CRM for all BD
            relationships.
          </li>
          <li>
            Make sure communications to relationship partners are all consistent
            and professional in their messaging.
          </li>
          <li>
            Collaboratively support the Growth workstream group in all growth
            strategies where required.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Design & Content",
    answer: (
      <div className="">
        Support Growth & Business Development workstreams for presentation
        materials to be used both in-house and externally.
        <br></br>
        <br></br>
        <ul className="list-disc pl-5" role="list">
          <li>Creation of design materials for promotion and marketing .</li>
          <li>
            Provide support for Galleon Voyages: Cursed Pirates content
            materials (twitter, medium), website graphics and more
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Treasury",
    answer: (
      <div className="">
        Our treasury workstream aims to diversify Galleon assets in two ways:
        preservation of capital so Galleon can thrive and sustain any future
        market conditions. As well as investing back into the DeFi ecosystem via
        its voyage: Flying Dutchman Capital.<br></br>
        <br></br>
        <span className="font-semibold text-theme-sky">
          Other tasks include:
        </span>
        <ul className="list-disc pl-5" role="list">
          <li>Maintaining a lean and well-aligned spending budget</li>
          <li>
            Liquidity / Methodology incentivisation schemes for new and existing
            product launches.
          </li>
          <li>Identifying safe APY generating opportunities for Galleon</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Analytics",
    answer: (
      <div className="">
        Our Analytics workstream maximizes data capture and efficiency to track
        both Galleon’s in-house as well as product strategy/methodology KPIs.
        <br></br>
        <br></br>
        <span className="font-semibold text-theme-sky">
          Other tasks include:
        </span>
        <ul className="list-disc pl-5" role="list">
          <li>
            Utilizing Dune Dashboards to develop detailed trend analysis and
            growth metrics of both Galleon and its products.
          </li>
          <li>
            Adding data-driven feedback and proposals to governance discussions
            on the Brethren Court.
          </li>
          <li>
            Tracking performance and engagement metrics that provides the Growth
            workstream with details breakdowns of potential opportunities.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Engineering",
    answer: (
      <span>
        Galleon is governed ultimately by Doubloon (DBL) holders through Galleon
        Improvement Proposals (GIP) and a model called{" "}
        <a
          href="https://docs.galleon.community/dao/governance"
          target={"_blank"}
          className="text-theme-sky" rel="noreferrer"
        >
          optimistic governance.
        </a>
      </span>
    ),
  },
];

const products = [
  {
    title: "ETH Maxy Yield Index",
    description:
      "ETHMAXY is the best leveraged $ETH liquid staking strategy in DeFi today, all within one tradable ERC20 token.",
    source:
      "https://github.com/GalleonDAO/galleon-tokenlist/blob/main/logos/ethmaxy.png?raw=true",
    link: "https://app.galleon.community/ethmaxy",
    active: true,
  },
  {
    title: "SOLUNAVAX Index",
    description:
      "SOLUNAVAX enables traders to gain L2 exposure to the popular, alternate Layer 1 assets, SOL, LUNA and AVAX",
    source:
      "https://github.com/GalleonDAO/galleon-tokenlist/blob/main/logos/solunavax-200px.png?raw=true",
    link: "https://app.galleon.community/solunavax",
    active: false,
  },
  // More files...
];

const Page = (props: { children?: JSX.Element }) => {
  return (
    <div>
      {props.children}
      <main>
        <div className="pt-10  bg-theme-black sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden bg-[url('/ship-bg-01.png')] bg-cover bg-no-repeat bg-center  pb-10 bg-opacity-100  min-h-screen">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl font-morion tracking-tight font-extrabold text-theme-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="pb-3  bg-clip-text text-transparent bg-gradient-to-r from-theme-champagne to-theme-oldlace sm:pb-5">
                      The Asset
                    </span>
                    <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-theme-champagne to-theme-oldlace sm:pb-5">
                      Management Guild
                    </span>
                  </h1>
                  <p className="text-3xl text-theme-white sm:text-3xl lg:text-lg xl:text-3xl">
                    We create on-chain investment themes.
                  </p>
                  <div className="mt-8 sm:mt-8">
                    <div className="sm:max-w-xl sm:mx-auto lg:mx-0">
                      <div className="sm:flex">
                        <div className="min-w-0">
                          <a
                            href="https://app.galleon.community"
                            target={"_blank"}
                            className="block w-full py-3 px-4 mb-10 rounded-2xl shadow hover:border-2 hover:border-theme-champagne hover:text-theme-champagne  bg-theme-champagne hover:bg-theme-navy text-theme-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-sky focus:ring-offset-theme-black font-semibold" rel="noreferrer"
                          >
                            Application
                          </a>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <a
                            href="https://discord.gg/galleondao"
                            target={"_blank"}
                            className="block w-full py-3 px-4 mb-10 rounded-2xl shadow hover:border-2 hover:border-theme-champagne hover:text-theme-champagne  bg-theme-champagne  text-theme-navy hover:bg-theme-navy  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-sky focus:ring-offset-theme-black font-semibold" rel="noreferrer"
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
                          <div className="w-full border-t border-theme-oldlace" />
                        </div>
                      </div>
                      <div className="relative flex pb-5 pt-5 justify-start">
                        <span className="pr-2 text-2xl font-bold font-morion text-theme-white">
                          Voyages
                        </span>
                      </div>
                      <a
                        href="https://cursedpirates.xyz"
                        target={"_blank"}
                        className="flex  items-center  text-theme-white bg-transparent p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-theme-navy" rel="noreferrer"
                      >
                        <img
                          src="/jollyroger-transp.png"
                          className="ml-2 w-16 h-16 bg-theme-oldlace  rounded-full text-theme-white"
                          aria-hidden="true"
                        />
                        <span className="px-3 py-0.5 font-wigrum  text-xl text-theme-white hover:text-theme-champagne font-semibold leading-5 uppercase tracking-wide rounded-full">
                          Cursed Pirates{" "}
                          <ChevronRightIcon className="w-8 h-8 -translate-y-1 inline-flex"></ChevronRightIcon>
                        </span>
                      </a>
                      <a
                        href="https://flyingdutchman.capital"
                        target={"_blank"}
                        className="flex  mt-3 items-center font-wigrum text-theme-white bg-transparent p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-theme-navy" rel="noreferrer"
                      >
                        <img
                          src="/fdc-flag-transp.png"
                          className="ml-2 w-16 h-16 bg-theme-oldlace  rounded-full text-theme-white"
                          aria-hidden="true"
                        />
                        <span className="px-3 py-0.5 text-xl text-theme-white hover:text-theme-champagne font-semibold leading-5 uppercase tracking-wide rounded-full">
                          Flying Dutchman Capital{" "}
                          <ChevronRightIcon className="w-8 h-8 -translate-y-1 inline-flex"></ChevronRightIcon>
                        </span>
                      </a>

                      <p className="mt-3 text-sm text-theme-white sm:mt-4"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
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

        {/* Feature section with grid */}
        <div className="relative bg-theme-oldlace border-t-2 border-theme-navy py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h3 className="mt-2 text-3xl font-bold font-morion text-theme-navy  sm:text-5xl">
              About our decentralised organisation
            </h3>
            <p className="mt-5 max-w-prose mx-auto text-xl text-theme-navy">
              Galleon is a guild of like-minded experienced and aspiring
              investor product methodologists aiming to research, design, and
              create best-in-class thematic, leverage and yield based structured
              products on-chain.
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
                              target={"_blank"} rel="noreferrer"
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
                          <a href={feature.link} target={"_blank"} rel="noreferrer">
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

        <div className=" bg-theme-navy  border-t-2 border-theme-champagne lg:z-10 py-24 lg:relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-4">
                <img className="mt-10 mb-10" src={GalleonLogo} alt="" />
              </div>
            </div>
            <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:pb-10 lg:pt-14 lg:max-w-none">
                <div>
                  <h3 className="mt-2 text-5xl font-bold font-morion text-theme-oldlace  sm:text-5xl">
                    Doubloon ($DBL)
                  </h3>
                  <p className="mt-6 text-xl font-medium text-theme-white">
                    Galleon is a decentralized, autonomous asset manager that
                    issued its own native token, $DBL. Holders of $DBL can take
                    part in governing Galleon via proposals and voting following
                    the optimistic governance model. $DBL is either earned
                    through contribution to the DAO through professional
                    services or via buying the token through our decentralised
                    application or Uniswap on the Arbitrum network.
                  </p>

                  <a
                    href="https://app.galleon.community/dbl"
                    target={"_blank"}
                    className="block text-center m-auto mt-10 py-3 w-1/2 px-4 mb-10 font-semibold rounded-2xl text-xl shadow bg-gradient-to-r border-2 hover:text-theme-navy bg-theme-white hover:bg-theme-oldlace text-theme-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-sky focus:ring-offset-theme-black" rel="noreferrer"
                  >
                    Buy Doubloon ($DBL)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                        alt=""
                        className="object-cover group-hover:opacity-75"
                      />
                    </div>
                  </a>
                  <p className="mt-5 block text-lg font-semibold text-center text-theme-navy truncate pointer-events-none">
                    {product.title}
                  </p>
                  <p className="block text-md font-medium text-center  text-theme-navy pointer-events-none">
                    {product.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative bg-theme-oldlace border-t-2 border-theme-navy py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center  sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <span className="inline-flex items-center text-center justify-center">
              <img
                src={AboutIcon}
                className="h-full w-full text-center"
                aria-hidden="true"
              />
            </span>
            <h3 className="mt-5 text-center text-3xl font-bold font-morion text-theme-navy  sm:text-5xl">
              Contribute to Galleon
            </h3>
            <p className="text-xl text-center pt-1  font-semibold text-theme-navy">
              "Part of the ship, part of the crew"
            </p>

            <div className="mt-6 text-left prose prose-indigo prose-xl text-theme-navy mx-auto">
              <p className="mt-3 text-lg text-theme-navy">
                As a contributor, you help to build, grow and improve Galleon.
                You’ll take part in the DAOs governance, raising Galleon
                Improvement Proposals (GIPs) or providing feedback via the
                Brethren Court on strategic objectives, all for the purpose of
                helping to guide our fellow pirate crewmates and steer Galleon
                into prosperous waters.
              </p>

              <figure>
                <img
                  className="w-full border-2 border-theme-navy rounded-2xl "
                  src={crewBackground}
                  alt=""
                  width={1310}
                  height={873}
                />
              </figure>

              <h3>Why become a buccaneer?</h3>

              <p>
                It’s never been a better time to become a pirate, helping to
                build the best-in-class structured products and making crypto
                investing simple.
              </p>
              <p>
                You can be a significant part of the development of our on-chain
                investment themes that make entry into new and exciting crypto
                narratives as easy as one click.
              </p>
              <ul role="list" className="list-disc text-theme-navy">
                <li>Earn rewards</li>
                <li>
                  Be part of an exciting web3 DAO and get compensated in $DBL
                  for all the work you contribute.
                </li>
                <li>
                  Liaise with the biggest protocols, and highest calibre
                  builders, collaborate and help to innovate the cryptocurrency
                  space and the future of finance.
                </li>
                <li>Autonomous working</li>
                <li>
                  Working remotely and to your own schedule is part of the
                  Galleon life, feel empowered to be your own boss.
                </li>
              </ul>
              <div className="mt-10 text-center justify-center">
                <a
                  href="https://discord.gg/galleondao"
                  target={"_blank"}
                  className="block w-1/2 py-3 m-auto px-4 mb-10 rounded-2xl shadow border-2 border-theme-navy hover:border-theme-navy hover:text-theme-champagne  bg-theme-champagne  text-theme-navy hover:bg-theme-navy  no-underline font-semibold" rel="noreferrer"
                >
                  Join the Crew
                </a>
              </div>
              <h3>Our Workstreams</h3>
            </div>

            <div className="max-w-3xl mx-auto divide-y-2 pb-4 border-theme-navy border-l-2 pl-5  divide-theme-navy">
              <dl className="mt-6 space-y-6 divide-y divide-theme-navy">
                {workstreams.map((stream) => (
                  <Disclosure as="div" key={stream.title} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt className="text-lg">
                          <Disclosure.Button className="text-left w-full flex justify-between items-start text-theme-navy">
                            <span className="font-medium text-xl text-theme-navy">
                              {stream.title}
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
                            {stream.answer}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
