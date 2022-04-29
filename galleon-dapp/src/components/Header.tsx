import logo from "assets/brand/Vector-Logo-2.png";
import { Link } from "react-router-dom";
import ConnectButton from "./header/ConnectButton";

const Header = () => {
  return (
    <header className="bg-white border-b-2 border-theme-navy ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 " aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-theme-navy lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Galleon</span>
              <img className="h-10 w-auto" src={logo} alt="" />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <span className="text-lg font-semibold text-theme-navy hover:text-theme-sky">
                <Link to="/">Dashboard</Link>
              </span>
              <span className="text-lg font-semibold text-theme-navy hover:text-theme-sky">
                <Link to="/products">Products</Link>
              </span>
              <span className="text-lg font-semibold text-theme-navy hover:text-theme-sky">
                <Link to="/dbl">$DBL</Link>
              </span>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <ConnectButton />
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <a
            className="text-base font-semibold text-theme-navy hover:text-theme-sky"
            href="/"
          >
            Dashboard
          </a>
          <a
            className="text-base font-semibold text-theme-navy hover:text-theme-sky"
            href="/products"
          >
            Products
          </a>
          <a
            className="text-base font-semibold text-theme-navy hover:text-theme-sky"
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
