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
        try {
            const withdraws = await agent.Withdraws.list();
            withdraws.forEach(withdraw =>{
                withdraw.date = withdraw.date.split('T')[0];
                this.withdrawRegistry.set(withdraw.id, withdraw);
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

    selectWithdraw = (id: string) => {
        this.selectedWithdraw = this.withdrawRegistry.get(id);
    }

    cancelSelectedWithdraw = () => {
        this.selectedWithdraw = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectWithdraw(id) : this.cancelSelectedWithdraw();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
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
                if (this.selectedWithdraw?.id === id) this.cancelSelectedWithdraw();
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
