import Navigation from 'components/Navigation'
import { Fragment } from 'react'
import { Popover, Transition, Disclosure } from '@headlessui/react'
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import crewBackground from 'assets/brand/crew-bg.png'
import { ChevronDownIcon } from '@heroicons/react/outline'
import ResourcesIcon from 'assets/brand/Resources-Icon.png'
import CommunityIcon from 'assets/brand/Community-Icon.png'
import AboutIcon from 'assets/brand/About-Icon.png'
import ApplicationIcon from 'assets/brand/Application-Icon.png'
import GovernanceIcon from 'assets/brand/Governance-Icon.png'
import ProductsIcon from 'assets/brand/Products-Icon.png'
import TreasuryIcon from 'assets/brand/Treasury-Icon.png'
import GalleonLogo from 'assets/brand/Union-Logo-Light.png'

import ResourcesIconDark from 'assets/brand/Resources-Icon-Dark.png'
import CommunityIconDark from 'assets/brand/Community-Icon-Dark.png'
import AboutIconDark from 'assets/brand/About-Icon-Dark.png'
import ApplicationIconDark from 'assets/brand/Application-Icon-Dark.png'
import GovernanceIconDark from 'assets/brand/Governance-Icon-Dark.png'
import ProductsIconDark from 'assets/brand/Products-Icon-Dark.png'
import TreasuryIconDark from 'assets/brand/Treasury-Icon-Dark.png'
import { classNames } from 'utils'

const Doubloon = () => {
  return (
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
              <h3 className="mt-2 text-4xl md:text-5xl font-bold font-morion text-theme-oldlace  sm:text-5xl">
                Doubloon ($DBL)
              </h3>
              <p className="mt-6 text-xl font-medium text-theme-oldlace">
                Galleon is a decentralized, autonomous asset manager that issued
                its own native token, $DBL. Holders of $DBL can take part in
                governing Galleon via proposals and voting following the
                optimistic governance model. $DBL is either earned through
                contribution to the DAO through professional services or via
                buying the token through our decentralised application or
                Uniswap on the Arbitrum network.
              </p>

              {/* <a
                href="https://app.galleon.community/dbl"
                target={'_blank'}
                className="block text-center m-auto mt-10 py-4 md:w-1/2 w-full text-xl px-4 mb-10 rounded-2xl border-2 shadow border-theme-navy hover:border-theme-champagne hover:text-theme-champagne  bg-theme-champagne hover:bg-theme-navy text-theme-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-sky focus:ring-offset-theme-black"
                rel="noreferrer"
              >
                Doubloon ($DBL)
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doubloon
