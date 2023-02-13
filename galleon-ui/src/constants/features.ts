import ResourcesIcon from "assets/brand/Resources-Icon.png";
import CommunityIcon from "assets/brand/Community-Icon.png";
import ApplicationIcon from "assets/brand/Application-Icon.png";
import GovernanceIcon from "assets/brand/Governance-Icon.png";
import ProductsIcon from "assets/brand/Products-Icon.png";
import TreasuryIcon from "assets/brand/Treasury-Icon.png";

import links from "constants/externalLinks";

export const features = [
  // {
  //   name: "Documentation",
  //   description:
  //     "Read up on how Galleon operates, our optimistic governance model and contributor guidelines.",
  //   link: links.handbookLink,
  //   icon: ResourcesIcon,
  // },
  {
    name: "Community Crew",
    description:
      "Join our thriving community and get involved in our initiatives to earn governance power through $DBL.",
    link: links.discordLink,
    icon: CommunityIcon,
  },
  {
    name: "Governance",
    description:
      "Participate in Galleon proposals through on-chain voting mechanisms on Snapshot using held $DBL.",
    link: links.voteLink,
    icon: TreasuryIcon,
  },
  // {
  //   name: "Treasury",
  //   description:
  //     "Take a look into the treasury and organisation health as all financial activity is executed transparently.",
  //   link: links.treasury,
  //   icon: TreasuryIcon,
  // },
];
