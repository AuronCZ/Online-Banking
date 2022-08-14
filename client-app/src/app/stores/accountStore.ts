import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Account } from "../models/account";
import {format} from 'date-fns';


export default class AccountStore {
    accountRegistry = new Map<string, Account>();
    selectedAccount: Account | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get accountsByDate() {
        return Array.from(this.accountRegistry.values()).sort((a, b) => a.openDate!.getTime() - b.openDate!.getTime());
    }

    get groupedAccounts() {
        return Object.entries(
            this.accountsByDate.reduce((accounts, account) => {
                const date = format(account.openDate!, 'dd MMM yyyy');
                accounts[date] = accounts[date] ? [...accounts[date], account] : [account];
                return accounts;
            }, {} as {[key: string]: Account[]})
        )
    }

    loadAccounts = async () =>  {
        this.loadingInitial = true;
        try {
            const accounts = await agent.Accounts.list();
            accounts.forEach(account =>{
                this.setAccount(account);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadAccount = async (id: string) => {
        let account = this.getAccount(id);
        if (account) {
            this.selectedAccount = account;
            return account;
        } else {
            this.loadingInitial = true;
            try {
                account = await agent.Accounts.details(id);
                this.setAccount(account);
                runInAction(() => {
                    this.selectedAccount = account;
                })
                this.setLoadingInitial(false);
                return account;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setAccount = (account: Account) => {
        account.openDate = new Date(account.openDate!);
        this.accountRegistry.set(account.id, account);
    }

    private getAccount = (id: string) => {
        return this.accountRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createAccount = async (account: Account) => {
        this.loading = true;
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