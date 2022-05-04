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
        Galleon's core workstream, building the most innovative, leading DeFi
        products is our goal and therefore we need the greatest minds in-house
        to develop them. Our engineering workstream ranges from deep smart
        contract engineering to backend analytic and logging services all the
        way to frontend user facing applications.
      </span>
    ),
  },
];

const Contribute = () => {
  return (
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
            You’ll take part in the DAOs governance, raising Galleon Improvement
            Proposals (GIPs) or providing feedback via the Brethren Court on
            strategic objectives, all for the purpose of helping to guide our
            fellow pirate crewmates and steer Galleon into prosperous waters.
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
            It’s never been a better time to become a pirate, helping to build
            the best-in-class structured products and making crypto investing
            simple.
          </p>
          <p>
            You can be a significant part of the development of our on-chain
            investment themes that make entry into new and exciting crypto
            narratives as easy as one click.
          </p>
          <ul role="list" className="list-disc text-theme-navy">
            <li>Earn rewards</li>
            <li>
              Be part of an exciting web3 DAO and get compensated in $DBL for
              all the work you contribute.
            </li>
            <li>
              Liaise with the biggest protocols, and highest calibre builders,
              collaborate and help to innovate the cryptocurrency space and the
              future of finance.
            </li>
            <li>Autonomous working</li>
            <li>
              Working remotely and to your own schedule is part of the Galleon
              life, feel empowered to be your own boss.
            </li>
          </ul>
          <div className="mt-10 text-center justify-center">
            <a
              href="https://discord.gg/galleondao"
              target={"_blank"}
              className="block w-1/2 py-3 m-auto px-4 mb-10 rounded-2xl shadow border-2 border-theme-navy hover:border-theme-navy hover:text-theme-champagne  bg-theme-champagne  text-theme-navy hover:bg-theme-navy  no-underline font-semibold"
              rel="noreferrer"
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
  );
};

export default Contribute;
