import { TransactionHistoryItem } from "components/dashboard/TransactionHistoryTable";
import { DoubloonToken, EthMaxYieldIndex } from "constants/tokens";
import { AlchemyApiTransaction } from "utils/alchemyApi";

function resolveAddressToSymbol(address: string): string {
  switch (address) {
    case DoubloonToken.address!:
      return DoubloonToken.symbol;
    case EthMaxYieldIndex.address!:
      return EthMaxYieldIndex.symbol;
    default:
      return truncateAddress(address);
  }
}

function truncateAddress(address: string): string {
  return address.length < 12
    ? address
    : `${address.substring(0, 5)}...${address.substring(address.length - 3)}`;
}

function createHistoryItems(
  transactions: AlchemyApiTransaction[],
  areFromUser: boolean = false
): TransactionHistoryItem[] {
  const items: TransactionHistoryItem[] = transactions.map((tx) => {
    const blockNum = tx.blockNum;
    const date = Number(blockNum).toString();
    const hash = tx.hash.substring(0, 12) + "...";
    const from = resolveAddressToSymbol(areFromUser ? tx.from : tx.to);
    const to = resolveAddressToSymbol(areFromUser ? tx.to : tx.from);
    const type = areFromUser ? "Send" : "Receive";
    return {
      hash,
      type,
      asset: tx.asset,
      date,
      from,
      to,
      value: tx.value,
      explorerUrl: `https://etherscan.io/tx/${tx.hash}`,
    };
  });
  return items;
}

export function assembleHistoryItems(transactions: {
  from: AlchemyApiTransaction[];
  to: AlchemyApiTransaction[];
}) {
  const historyItemsFrom = createHistoryItems(transactions.from, true);
  const historyItemsTo = createHistoryItems(transactions.to);
  const items = [...historyItemsFrom, ...historyItemsTo].sort(
    (item1, item2) => {
      if (item1.date < item2.date) {
        return 1;
      }
      if (item1.date > item2.date) {
        return -1;
      }
      return 0;
    }
  );
  return items;
}
