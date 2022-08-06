import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Account } from "../models/account";
import {v4 as uuid} from 'uuid';

export default class AccountStore {
    accountRegistry = new Map<string, Account>();
    selectedAccount: Account | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get accountsByDate() {
        return Array.from(this.accountRegistry.values()).sort((a, b) => Date.parse(a.openDate) - Date.parse(b.openDate));
    }

    loadAccounts = async () =>  {
        try {
            const accounts = await agent.Accounts.list();
            accounts.forEach(account =>{
                account.openDate = account.openDate.split('T')[0];
                this.accountRegistry.set(account.id, account);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectAccount = (id: string) => {
        this.selectedAccount = this.accountRegistry.get(id);
    }

    cancelSelectedAccount = () => {
        this.selectedAccount = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectAccount(id) : this.cancelSelectedAccount();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createAccount = async (account: Account) => {
        this.loading = true;
        account.id = uuid();
        try {
            await agent.Accounts.create(account);
            runInAction(() => {
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAccount = async (account: Account) => {
        this.loading = true;
        try {
            await agent.Accounts.update(account);
            runInAction(() => {
                this.accountRegistry.set(account.id, account);
                this.selectedAccount = account;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteAccount = async (id: string) => {
        this.loading = true;
        try {
            await agent.Accounts.delete(id);
            runInAction(() => {
                this.accountRegistry.delete(id);
                if (this.selectedAccount?.id === id) this.cancelSelectedAccount();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }
}