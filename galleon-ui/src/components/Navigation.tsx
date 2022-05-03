import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, ShieldCheckIcon, XIcon } from "@heroicons/react/outline";
import galleon from "assets/brand/Vector-Logo-1.png";

const navigation = [
  { name: "DAO", href: "#" },
  { name: "Products", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const Navigation = (props: { children?: JSX.Element }) => {
  return (
    <>
      <Popover as="header" className="relative">
        <div className="bg-transparent h-0">
          <nav
            className="relative max-w-7xl  pt-5 mx-auto flex items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <span className="sr-only">Galleon</span>
                <img className="h-6 w-auto sm:h-6" src={galleon} alt="" />

                {/* <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-theme-oldlace rounded-2xl p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div> */}
              </div>
              {/* <div className="hidden space-x-8 md:flex md:ml-10">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-white hover:text-gray-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div> */}
            </div>
            {/* <div className="hidden md:flex md:items-center md:space-x-6">
              <a
                href="#"
                className="text-base font-semibold text-white border-theme-sky border-2 py-2 px-4 rounded-2xl hover:text-gray-300"
              >
                Join the Crew
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-2xl text-white bg-theme-sky hover:bg-gray-700"
              >
                App
              </a>
            </div> */}
          </nav>
        </div>

        {/* <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
          >
            <div className="rounded-lg shadow-md bg-theme-oldlace ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-teal-500-cyan-600.svg"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-theme-oldlace rounded-2xl p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="pt-5 pb-6">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-2xl text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-6 px-5">
                  <a
                    href="#"
                    className="block text-center w-full py-3 px-4 rounded-2xl shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700"
                  >
                  Join the Crew
                  </a>
                </div>
                <div className="mt-6 px-5">
                  <p className="text-center text-base font-medium text-gray-500">
                    Existing customer?{' '}
                    <a href="#" className="text-gray-900 hover:underline">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition> */}
      </Popover>
      {props.children}
    </>
  );
};

export default Navigation;
