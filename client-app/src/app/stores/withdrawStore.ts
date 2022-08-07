import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Withdraw } from "../models/withdraw";
import {v4 as uuid} from 'uuid';

export default class WithdrawStore {
    withdrawRegistry = new Map<string, Withdraw>();
    selectedWithdraw: Withdraw | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get withdrawsByDate() {
        return Array.from(this.withdrawRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadWithdraws = async () => {
        this.loadingInitial = true;
        try {
            const withdraws = await agent.Withdraws.list();
            withdraws.forEach(withdraw =>{
                this.setWithdraw(withdraw);
              })
              this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadWithdraw = async (id: string) => {
        let withdraw = this.getWithdraw(id);
        if (withdraw) {
            this.selectedWithdraw = withdraw;
        } else {
            this.loadingInitial = true;
            try {
                withdraw = await agent.Withdraws.details(id);
                this.setWithdraw(withdraw);
                this.selectedWithdraw = withdraw;
                this.setLoadingInitial(false);
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setWithdraw = (withdraw: Withdraw) => {
        withdraw.date = withdraw.date.split('T')[0];
        this.withdrawRegistry.set(withdraw.id, withdraw);
    }

    private getWithdraw = (id: string) => {
        return this.withdrawRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createWithdraw = async (withdraw: Withdraw) => {
        this.loading = true;
        withdraw.id = uuid();
        try {
            await agent.Withdraws.create(withdraw);
            runInAction(() => {
                this.withdrawRegistry.set(withdraw.id, withdraw);
                this.selectedWithdraw = withdraw;
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

    updateWithdraw = async (withdraw: Withdraw) => {
        this.loading = true;
        try {
            await agent.Withdraws.update(withdraw);
            runInAction(() => {
                this.withdrawRegistry.set(withdraw.id, withdraw);
                this.selectedWithdraw = withdraw;
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

    deleteWithdraw = async (id: string) => {
        this.loading = true;
        try {
            await agent.Withdraws.delete(id);
            runInAction(() => {
                this.withdrawRegistry.delete(id);
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
