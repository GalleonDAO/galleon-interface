import Navigation from "components/Navigation";
import Footer from "components/Footer";
import Landing from "components/Landing";

const Dummy = () => {
  return (
    <>
      <div className="bg-theme-oldlace h-screen">
        <div className="relative overflow-hidden">
          <div className="h-full">
            <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-theme-navy sm:text-4xl">
                <span className="block font-morion pb-2">
                  Galleon has a new look coming here on 06/04/2022
                </span>
                <span className="block font-morion">Join the Community</span>
              </h2>
              <div className="mt-4 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="https://discord.gg/galleondao"
                    target={"_blank"}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-2xl text-theme-oldlace bg-theme-navy hover:opacity-70" rel="noreferrer"
                  >
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dummy;
