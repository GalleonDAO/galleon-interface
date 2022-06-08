import GalleonLogo from "assets/brand/Union-Logo-Light.png";
import links from "constants/externalLinks";

const footerNavigation = {
  information: [
    { name: "Documentation", href: "https://docs.galleon.community" },
    { name: "Analytics", href: "https://dune.xyz/galleondao" },
    {
      name: "Treasury",
      href: links.treasury,
    },
    {
      name: "DBL Contract",
      href: links.dblContract,
    },
  ],
  products: [
    { name: "Products", href: links.dapp },
    { name: "Set Protocol", href: links.tokensets },
    {
      name: "ETHMAXY",
      href: links.dapp + "/ethmaxy",
    },
    // {
    //   name: "BYE",
    //   href: links.dapp + "/bye",
    // },
  ],
  community: [
    { name: "Discord", href: links.discordLink },
    { name: "Blog", href: links.blog },
    { name: "Brethren Court", href: links.forumLink },
    { name: "Voting", href: links.voteLink },
  ],
  legal: [],
  social: [
    {
      name: "Twitter",
      href: links.twitterLink,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: links.github,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const Footer = (props: { children?: JSX.Element }) => {
  return (
    <>
      {props.children}
      <footer className="bg-theme-navy" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <img className="h-10" src={GalleonLogo} alt="Company name" />
              <p className="text-theme-oldlace text-base">
                We create on-chain investment themes.
              </p>
              <div className="flex space-x-6">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-theme-white hover:text-theme-oldlace"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-theme-white tracking-wider uppercase">
                    Information
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.information.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-theme-oldlace hover:text-theme-champagne"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-theme-white tracking-wider uppercase">
                    Products
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.products.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-theme-oldlace hover:text-theme-champagne"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-theme-white tracking-wider uppercase">
                    Community
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.community.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-theme-oldlace hover:text-theme-champagne"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-theme-white tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-theme-oldlace hover:text-theme-champagne"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 py-8">
            <p className="text-base text-theme-oldlace xl:text-center">
              Information is for educational and illustrative purposes only.
              Galleon is not engaged in the business of the offer, sale or
              trading of securities and does not provide legal, tax, or
              investment advice. Cryptocurrencies and other digital assets are
              speculative and involve a substantial degree of risk, including
              the risk of complete loss. There can be no assurance that any
              cryptocurrency, token, coin, or other crypto asset will be viable,
              liquid, or solvent. No Galleon communication is intended to imply
              that any digital assets are low-risk or risk-free. Galleon works
              hard to provide accurate information on this website, but cannot
              guarantee all content is correct, complete, or updated.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
