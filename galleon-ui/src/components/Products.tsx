import { products } from "constants/products";

const Products = () => {
  return (
    <div className=" bg-theme-white  border-t-2 border-theme-navy lg:relative">
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
              className="relative flex flex-col rounded-xl shadow-lg overflow-hidden p-8 border-theme-navy"
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
                  className="inline-flex min-w-[40%] justify-center text-center py-2 px-4 rounded-xl border-2 shadow border-theme-navy hover:border-theme-navy hover:text-theme-navy  bg-theme-navy hover:bg-theme-oldlace text-theme-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </div>
              <div className="pt-2 justify-evenly text-center">
                <a
                  href={product.link}
                  target={"_blank"}
                  className="inline-flex min-w-[40%] justify-center text-center py-2 px-4 ml-2 rounded-xl border-2 shadow border-theme-navy hover:border-black hover:text-theme-navy   hover:bg-theme-champagne bg-theme-oldlace text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
                  rel="noreferrer"
                >
                  Swap
                </a>
                {product.dashboard ? (
                  <a
                    href={product.dashboard}
                    target={"_blank"}
                    className="inline-flex min-w-[40%] justify-center text-center py-2 px-4 ml-2 rounded-xl border-2 shadow border-theme-navy hover:border-black hover:text-theme-navy   hover:bg-theme-champagne bg-theme-oldlace text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-navy text-sm md:text-xl focus:ring-offset-theme-black "
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
