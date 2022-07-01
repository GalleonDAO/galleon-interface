export interface Component {
  id: string;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  quantity: string;
  status: string;
  position_type: string;
  full_amount_in_set: string;
  total_price_usd: string;
  percent_of_set: string;
  benchmark?: any;
  colors: string[];
  stable: boolean;
  image: string;
}

export interface Operator {
  first_name: string;
  last_name: string;
  address: string;
  image_url?: any;
  username: string;
  description: string;
  website?: any;
  company?: any;
  twitter?: any;
  last_activity_at: string;
  created_at: string;
}

export interface Methodologist {
  first_name: string;
  last_name: string;
  address: string;
  image_url: string;
  username: string;
  full_company_name: string;
  description: string;
  website: string;
  company: string;
  twitter: string;
  last_activity_at: string;
  created_at: string;
}

export interface UnactualizedStreamingFees {
  usd_value: string;
  set_value: string;
}

export interface Fund {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price_usd: string;
  streaming_fee: string;
  issue_fee: string;
  redeem_fee: string;
  nav_premium_fee: string;
  claim_fee: string;
  estimated_apy: string;
  buy_disabled: boolean;
  sell_disabled: boolean;
  experimental: boolean;
  is_nav_issuance_enabled: boolean;
  is_uniswap_buy_enabled: boolean;
  description: string;
  created_at: Date;
  image: string;
  components: Component[];
  market_cap: string;
  holder_count: number;
  follower_count: number;
  posts: any[];
  operator_contribution: string;
  operator: Operator;
  methodologist: Methodologist;
  max_drawdown: string;
  unactualized_streaming_fees: UnactualizedStreamingFees;
  geo_banned: boolean;
  current_leverage_ratio?: any;
  target_leverage_ratio?: any;
  strategy_contract_address: string;
  debt_position_health?: any;
  liquidity_pool_type: string;
}

export interface GetFundsData {
  fund: Fund;
}
