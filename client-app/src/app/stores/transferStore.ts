import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Transfer } from "../models/transfer";
import {v4 as uuid} from 'uuid';

export default class TransferStore {
    transferRegistry = new Map<string, Transfer>();
    selectedTransfer: Transfer | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get transfersByDate() {
        return Array.from(this.transferRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadTransfers = async () => {
        try {
            const transfers = await agent.Transfers.list();
            transfers.forEach(transfer =>{
                transfer.date = transfer.date.split('T')[0];
                this.transferRegistry.set(transfer.id, transfer);
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

    selectTransfer = (id: string) => {
        this.selectedTransfer = this.transferRegistry.get(id);
    }

    cancelSelectedTransfer = () => {
        this.selectedTransfer = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectTransfer(id) : this.cancelSelectedTransfer();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createTransfer = async (transfer: Transfer) => {
        this.loading = true;
        transfer.id = uuid();
        try {
            await agent.Transfers.create(transfer);
            runInAction(() => {
                this.transferRegistry.set(transfer.id, transfer);
                this.selectedTransfer = transfer;
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

    updateTransfer = async (transfer: Transfer) => {
        this.loading = true;
        try {
            await agent.Transfers.update(transfer);
            runInAction(() => {
                this.transferRegistry.set(transfer.id, transfer);
                this.selectedTransfer = transfer;
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

    deleteTransfer = async (id: string) => {
        this.loading = true;
        try {
            await agent.Transfers.delete(id);
            runInAction(() => {
                this.transferRegistry.delete(id);
                if (this.selectedTransfer?.id === id) this.cancelSelectedTransfer();
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
