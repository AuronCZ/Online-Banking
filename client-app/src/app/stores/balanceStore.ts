import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Balance } from "../models/balance";


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

    get groupedBalances() {
        return Object.entries(
            this.balancesByDate.reduce((balances, balance) => {
                const date = balance.date;
                balances[date] = balances[date] ? [...balances[date], balance] : [balance];
                return balances;
            }, {} as {[key: string]: Balance[]})
        )
    }

    loadBalances = async () => {
        this.loadingInitial = true;
        try {
            const balances = await agent.Balances.list();
            balances.forEach(balance =>{
                this.setBalance(balance);
              })
              this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadBalance = async (id: string) => {
        let balance = this.getBalance(id);
        if (balance) {
            this.selectedBalance = balance;
            return balance;
        } else {
            this.loadingInitial = true;
            try {
                balance = await agent.Balances.details(id);
                this.setBalance(balance);
                runInAction(() => {
                    this.selectedBalance = balance;
                })
                this.setLoadingInitial(false);
                return balance;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setBalance = (balance: Balance) => {
        balance.date = balance.date.split('T')[0];
        this.balanceRegistry.set(balance.id, balance);
    }

    private getBalance = (id: string) => {
        return this.balanceRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBalance = async (balance: Balance) => {
        this.loading = true;
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
