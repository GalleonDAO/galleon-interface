import { Disclosure } from "@headlessui/react";
import crewBackground from "assets/brand/crew-bg.png";
import { ChevronDownIcon } from "@heroicons/react/outline";
import AboutIcon from "assets/brand/About-Icon.png";

import { classNames } from "utils";
import links from "constants/externalLinks";
import { workstreams } from "constants/workstreams";

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
              className="w-full border-2 border-theme-navy rounded-xl "
              src={crewBackground}
              alt="background"
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
              href={links.contribute}
              target={"_blank"}
              className="block w-1/2 py-3 m-auto px-4 mb-10 rounded-xl shadow border-2 border-theme-navy hover:border-theme-navy hover:text-theme-champagne  bg-theme-champagne  text-theme-navy hover:bg-theme-navy text-sm md:text-xl  no-underline "
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
