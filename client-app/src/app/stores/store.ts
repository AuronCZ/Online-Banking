import { createContext,  useContext } from "react";
import AccountStore from "./accountStore";
import BalanceStore from "./balanceStore";
import CardStore from "./cardStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import TransferStore from "./transferStore";
import UserStore from "./userStore";
import WithdrawStore from "./withdrawStore";

interface Store{
    accountStore: AccountStore;
    balanceStore: BalanceStore;
    cardStore: CardStore;
    transferStore: TransferStore;
    withdrawStore: WithdrawStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;

}

export const store: Store = {
    accountStore: new AccountStore(),
    balanceStore: new BalanceStore(),
    cardStore: new CardStore(),
    transferStore: new TransferStore(),
    withdrawStore: new WithdrawStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}