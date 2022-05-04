import logo from "assets/brand/Vector-Logo-1.png";
import { Link } from "react-router-dom";
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
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <span className="text-lg font-semibold text-theme-oldlace hover:text-theme-champagne">
                <Link to="/">Dashboard</Link>
              </span>
              <span className="text-lg font-semibold text-theme-oldlace hover:text-theme-champagne">
                <Link to="/products">Products</Link>
              </span>
              <span className="text-lg font-semibold text-theme-oldlace hover:text-theme-champagne">
                <Link to="/dbl">$DBL</Link>
              </span>
            </div>
          </div>
          <div className="md:ml-10 space-x-4">
            <ConnectButton />
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <a
            className="text-base font-semibold text-theme-oldlace hover:text-theme-champagne"
            href="/"
          >
            Dashboard
          </a>
          <a
            className="text-base font-semibold text-theme-oldlace hover:text-theme-champagne"
            href="/products"
          >
            Products
          </a>
          <a
            className="text-base font-semibold text-theme-oldlace hover:text-theme-champagne"
            href="/dbl"
          >
            $DBL
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
