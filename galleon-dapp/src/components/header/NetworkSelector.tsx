import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { ChainData, SUPPORTED_CHAINS } from "constants/chains";
import { useNetwork } from "providers/Network/NetworkProvider";
import { classNames } from "utils";

const NetworkSelector = () => {
  const {
    state: { network },
    actions: { changeNetwork },
  } = useNetwork();

  const setNetwork = (network: ChainData) => {
    changeNetwork(network.chainId);
  };

  return (
    <div className="inline-flex ml-4">
      <Listbox value={network} onChange={setNetwork}>
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="theme-sky relative w-full border-2 border-theme-oldlace cursor-pointer  bg-theme-oldlace rounded-2xl pl-3 pr-10 py-1.5 text-left shadow-sm shadow-theme-black focus:outline-none focus:ring-1 focus:ring-theme-oldlace focus:border-theme-oldlace font-medium ">
                <span className="block truncat  text-theme-navy">
                  {network.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-theme-navy"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="fixed bg-white z-10 mt-1 theme-sky shadow-md max-h-60 rounded-2xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none font-medium ">
                  {SUPPORTED_CHAINS.map((network) => (
                    <Listbox.Option
                      key={network.chainId}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-theme-navy bg-theme-oldlace"
                            : "text-gray-900",
                          "select-none relative py-2 pl-3 pr-9 cursor-pointer "
                        )
                      }
                      value={network}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "" : "font-normal",
                              "block truncate"
                            )}
                          >
                            <img
                              className="h-5 inline-flex w-auto pr-2"
                              src={network.icon}
                              alt="network logo"
                            />
                            {network.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-theme-navy" : "text-indigo-600",
                                "absolute  inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5 pl-1"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
export default NetworkSelector;
