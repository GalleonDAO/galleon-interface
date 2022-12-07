import { Link as LinkChak } from "@chakra-ui/react";
import logo from "assets/brand/Vector-Logo-1.png";
import { Link } from "react-router-dom";
import CoinbaseButton from "./CoinbaseButton";
import ConnectButton from "./header/ConnectButton";

const Header = () => {
  return (
    <header className="bg-theme-navy border-b-2 border-theme-oldlace ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 " aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between border-b  lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Galleon</span>
              <img
                className="hidden md:block md:h-8 md:w-auto"
                src={logo}
                alt="logo"
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <span className="text-lg  text-theme-oldlace hover:text-theme-champagne">
                <Link to="/">Dashboard</Link>
              </span>
              <span className="text-lg  text-theme-oldlace hover:text-theme-champagne">
                <Link to="/products">Flagship Products</Link>
              </span>
              {/* <span className="text-lg  text-theme-oldlace hover:text-theme-champagne">
                <Link to="/portfolios">Portfolios</Link>
              </span> */}
              <span className="text-lg  text-theme-oldlace hover:text-theme-champagne">
                <LinkChak
                  href="https://app.uniswap.org/#/swap?chain=arbitrum&inputCurrency=0xd3f1da62cafb7e7bc6531ff1cef6f414291f03d3&outputCurrency=0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
                  target={"_blank"}
                >
                  Doubloon
                </LinkChak>
              </span>
              <span className="text-lg text-theme-oldlace hover:text-theme-champagne">
                <CoinbaseButton></CoinbaseButton>
              </span>
            </div>
          </div>
          <div className="md:ml-10 space-x-4">
            <ConnectButton />
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <a
            className="text-base  text-theme-oldlace hover:text-theme-champagne"
            href="/"
          >
            Dashboard
          </a>
          <a
            className="text-base  text-theme-oldlace hover:text-theme-champagne"
            href="/products"
          >
            Flagship Products
          </a>
          {/* <a
            className="text-base  text-theme-oldlace hover:text-theme-champagne"
            href="/portfolios"
          >
            Portfolios
          </a> */}
          <a
            className="text-base  text-theme-oldlace hover:text-theme-champagne"
            href="https://app.uniswap.org/#/swap?chain=arbitrum&inputCurrency=0xd3f1da62cafb7e7bc6531ff1cef6f414291f03d3&outputCurrency=0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
            target={"_blank"}
            rel="noreferrer"
          >
            Doubloon
          </a>
          <CoinbaseButton></CoinbaseButton>
        </div>
      </nav>
    </header>
  );
};

export default Header;
