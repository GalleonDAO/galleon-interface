import ResourcesIcon from "assets/brand/Resources-Icon.png";
import CommunityIcon from "assets/brand/Community-Icon.png";
import ApplicationIcon from "assets/brand/Application-Icon.png";
import GovernanceIcon from "assets/brand/Governance-Icon.png";
import ProductsIcon from "assets/brand/Products-Icon.png";
import TreasuryIcon from "assets/brand/Treasury-Icon.png";

import links from "constants/externalLinks";

export const features = [
  {
    name: "Documentation",
    description:
      "Read up on how Galleon operates, our optimistic governance model and contributor guidelines.",
    link: links.handbookLink,
    icon: ResourcesIcon,
  },
  {
    name: "Community Crew",
    description:
      "Join our thriving community and get involved in our many initiatives to earn governance power through $DBL.",
    link: links.discordLink,
    icon: CommunityIcon,
  },
  {
    name: "Technology",
    description:
      "We use our technology partner Set Protocol to create the most secure, battle-tested products in DeFi.",
    link: links.tokensets,
    icon: ApplicationIcon,
  },
  {
    name: "Decentralised",
    description:
      "Participate in Galleon proposals through on-chain voting mechanisms on Snapshot using held $DBL.",
    link: links.forumLink,
    icon: GovernanceIcon,
  },
  {
    name: "Products",
    description:
      "Explore our growing suite on on-chain products across Ethereum, Optimism, Avalanche & Polygon",
    link: links.dapp,
    icon: ProductsIcon,
  },
  {
    name: "Treasury",
    description:
      "Take a look into the treasury and organisation health as all financial activity is executed transparently.",
    link: links.treasury,
    icon: TreasuryIcon,
  },
];
