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
          <div className="mt-12 mb-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-1 md:w-1/3 w-full lg:max-w-none">
            <div

              className="flex flex-col rounded-xl shadow-lg border border-theme-navy overflow-hidden"
            >

              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-theme-sky">
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
                      {'Today the core contributing team announce the depreciation of our current Set Protocol based structured products as we look to reinvent Galleon'}
                    </p>
                  </a>
                </div>

              </div>
            </div>
          </div>
          <p className="mt-5 max-w-prose mx-auto text-xl text-theme-navy">
            Galleon has recently announced the depreciation of its core product suite, built on top of Set Protocol infrastructure due to ongoing contraints, which you can read the full announcement for details.
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-theme-navy">The DAO now seeks to reinvent its core proposition whilst maintaining its core values of decentralisation, transparency and community. You can follow our progress on this journey, and contribute to the discussion on our Discord.</p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-theme-navy">The development of our voyages, such as Cursed Pirates are unaffected and we are excited to deliver on them soon.</p>

          {/* <div className="max-w-3xl mx-auto divide-y-2 pb-4 border-theme-navy border-l-2 pl-5  divide-theme-navy">
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
          </div> */}

          <div className="mt-10">
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
