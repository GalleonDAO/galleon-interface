import links from "constants/externalLinks";

const products = [
  {
    title: "ETH Max Yield Index",
    description:
      "ETHMAXY is the best leveraged $ETH liquid staking strategy in DeFi today, all within one tradable ERC20 token.",
    source:
      "https://github.com/GalleonDAO/galleon-tokenlist/blob/main/logos/ethmaxy.png?raw=true",
    link: links.dapp + "/ethmaxy",
    dashboard: "https://dune.com/galleondao/ETHMAXY-KPIs",
    documentation:
      "https://www.notion.so/galleon/The-ETH-Max-Yield-Index-2793239a6b314f3a83112d01df86d679",
  },
  {
    title: "Basis Yield ETH Index",
    description:
      "BYE is an ERC20 composable structured product that executes a high yield, cash-and-carry delta-neutral strategy.",
    source:
      "https://github.com/GalleonDAO/galleon-tokenlist/blob/main/logos/BYE.png?raw=true",
    link: links.dapp + "/bye",
    dashboard: null,
    documentation:
      "https://www.notion.so/galleon/Basis-Yield-ETH-Index-7e384ce4e21d4ea19898c19ccc36af61",
  },
  // More files...
];

const Products = () => {
  return (
    <div className=" border-t-2 bg-theme-white  border-theme-navy lg:relative">
      <div className="lg:mx-auto lg:max-w-7xl  py-24">
        <h3 className="mt-2 text-3xl  font-bold font-morion text-theme-navy text-center  sm:text-5xl">
          Structured Products
        </h3>
        <p className="mt-5 pb-12 text-center  mx-auto text-xl text-theme-navy">
          One-click on-chain investment themes for leveraged, yield and
          diversified exposure.
        </p>
        <ul
          role="list"
          className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
        >
          {products.map((product) => (
            <li
              key={product.title}
              className="relative shadow-md shadow-theme-champagne border-2 rounded-2xl p-8 border-theme-navy"
            >
              <a href={product.link} target={"_blank"} rel="noreferrer">
                <div className="group block w-50 h-50 justify-center">
                  <img
                    src={product.source}
                    alt="product logo"
                    className="object-cover group-hover:opacity-75"
                  />
                </div>
              </a>
              <p className="mt-6 block text-xl font-bold font-morion text-center text-theme-navy truncate pointer-events-none">
                {product.title}
              </p>
              <p className="block text-md font-lg text-center text-theme-navy pointer-events-none">
                {product.description}
              </p>
              <div className="pt-4 justify-evenly text-center">
                <a
                  href={product.documentation}
                  target={"_blank"}
                  className="inline-flex min-w-[40%] justify-center text-center py-2 px-4 rounded-2xl border-2 shadow border-theme-navy hover:border-theme-navy hover:text-theme-navy  bg-theme-navy hover:bg-theme-oldlace text-theme-oldlace focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </div>
              <div className="pt-2 justify-evenly text-center">
                <a
                  href={product.link}
                  target={"_blank"}
                  className="inline-flex min-w-[40%] justify-center text-center py-2 px-4 ml-2 rounded-2xl border-2 shadow border-theme-navy hover:border-black hover:text-theme-navy   hover:bg-theme-oldlace text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
                  rel="noreferrer"
                >
                  Buy
                </a>
                {product.dashboard ? (
                  <a
                    href={product.dashboard}
                    target={"_blank"}
                    className="inline-flex min-w-[40%] justify-center text-center py-2 px-4 ml-2 rounded-2xl border-2 shadow border-theme-navy hover:border-black hover:text-theme-navy   hover:bg-theme-oldlace text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
                    rel="noreferrer"
                  >
                    Analytics
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
