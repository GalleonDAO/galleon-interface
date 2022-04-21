import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { useEthers } from "@usedapp/core";

import { MAINNET, SUPPORTED_CHAINS } from "constants/chains";
import { useNetwork } from "hooks/useNetwork";
import { classNames } from "utils";

const NetworkSelector = () => {
  const { chainId } = useEthers();
  const { changeNetwork } = useNetwork();

  const [selected, setSelected] = useState(
    SUPPORTED_CHAINS.find((x) => x.chainId == chainId) ?? MAINNET
  );

  const setNetwork = (network) => {
    changeNetwork(network.chainId);
    setSelected(network);
  };

  return (
    <div className="inline-flex ml-4">
      <Listbox value={selected} onChange={setNetwork}>
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="theme-blue relative w-full border border-white bg-theme-blue rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-theme-blue focus:border-theme-blue font-medium ">
                <span className="block truncat text-white">
                  {selected.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-white"
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
                <Listbox.Options className="fixed bg-white z-10 mt-1 theme-blue shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none font-medium ">
                  {SUPPORTED_CHAINS.map((network) => (
                    <Listbox.Option
                      key={network.chainId}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-theme-blue" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={network}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            <img
                              className="h-5 inline-flex w-auto pr-2"
                              src={network.icon}
                              alt=""
                            />
                            {network.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
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
