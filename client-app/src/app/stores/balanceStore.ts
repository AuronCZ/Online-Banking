import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Balance } from "../models/balance";
import {v4 as uuid} from 'uuid';

export default class BalanceStore {
    balanceRegistry = new Map<string, Balance>();
    selectedBalance: Balance | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get balancesByDate() {
        return Array.from(this.balanceRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadBalances = async () => {
        try {
            const balances = await agent.Balances.list();
            balances.forEach(balance =>{
                balance.date = balance.date.split('T')[0];
                this.balanceRegistry.set(balance.id, balance);
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

    selectBalance = (id: string) => {
        this.selectedBalance = this.balanceRegistry.get(id);
    }

    cancelSelectedBalance = () => {
        this.selectedBalance = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectBalance(id) : this.cancelSelectedBalance();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createBalance = async (balance: Balance) => {
        this.loading = true;
        balance.id = uuid();
        try {
            await agent.Balances.create(balance);
            runInAction(() => {
                this.balanceRegistry.set(balance.id, balance);
                this.selectedBalance = balance;
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

    updateBalance = async (balance: Balance) => {
        this.loading = true;
        try {
            await agent.Balances.update(balance);
            runInAction(() => {
                this.balanceRegistry.set(balance.id, balance);
                this.selectedBalance = balance;
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

    deleteBalance = async (id: string) => {
        this.loading = true;
        try {
            await agent.Balances.delete(id);
            runInAction(() => {
                this.balanceRegistry.delete(id);
                if (this.selectedBalance?.id === id) this.cancelSelectedBalance();
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
