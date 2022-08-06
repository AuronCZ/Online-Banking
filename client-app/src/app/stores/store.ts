import { createContext,  useContext } from "react";
import AccountStore from "./accountStore";
import BalanceStore from "./balanceStore";
import CardStore from "./cardStore";
import TransferStore from "./transferStore";
import WithdrawStore from "./withdrawStore";

interface Store{
    accountStore: AccountStore
    balanceStore: BalanceStore
    cardStore: CardStore
    transferStore: TransferStore
    withdrawStore: WithdrawStore
}

export const store: Store = {
    accountStore: new AccountStore(),
    balanceStore: new BalanceStore(),
    cardStore: new CardStore(),
    transferStore: new TransferStore(),
    withdrawStore: new WithdrawStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}