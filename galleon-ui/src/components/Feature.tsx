import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { classNames } from "utils";
import { faqs } from "constants/faqs";
import { features } from "constants/features";

const Feature = () => {
  return (
    <div>
      {/* Feature section with grid */}
      <div className="relative bg-[url('./assets/Frame.png')]  bg-auto bg-center bg-theme-oldlace border-t-2 border-theme-navy py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h3 className="mt-2 text-3xl font-bold font-morion text-theme-navy  sm:text-5xl">
            About our decentralised organisation
          </h3>
          <p className="mt-5 max-w-prose mx-auto text-xl text-theme-navy">
            Galleon is a guild of experienced methodologists aiming to research,
            design, and create best-in-class thematic, leverage and yield based
            structured products on-chain across all EVM-based networks.
          </p>

          <div className="max-w-3xl mx-auto divide-y-2 pb-4 border-theme-navy border-l-2 pl-5  divide-theme-navy">
            <dl className="mt-6 space-y-6 divide-y divide-theme-navy">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6 ">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-theme-navy">
                          <span className="font-medium text-xl text-theme-navy ">
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 ">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className=" border border-theme-navy shadow-lg bg-theme-oldlace rounded-xl"
                >
                  <div className="flow-root pt-6  px-6 pb-8">
                    <div className="">
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
                      <h3 className="mt-8 text-xl font-bold font-morion text-theme-navy hover:text-theme-copper">
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
