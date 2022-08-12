import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Transfer } from "../models/transfer";


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

    get groupedTransfers() {
        return Object.entries(
            this.transfersByDate.reduce((transfers, transfer) => {
                const date = transfer.date;
                transfers[date] = transfers[date] ? [...transfers[date], transfer] : [transfer];
                return transfers;
            }, {} as {[key: string]: Transfer[]})
        )
    }

    loadTransfers = async () => {
        this.loadingInitial = true;
        try {
            const transfers = await agent.Transfers.list();
            transfers.forEach(transfer =>{
                this.setTransfer(transfer);
              })
              this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadTransfer = async (id: string) => {
        let transfer = this.getTransfer(id);
        if (transfer) {
            this.selectedTransfer = transfer;
            return transfer;
        } else {
            this.loadingInitial = true;
            try {
                transfer = await agent.Transfers.details(id);
                this.setTransfer(transfer);
                runInAction(() => {
                    this.selectedTransfer = transfer;
                })
                this.setLoadingInitial(false);
                return transfer;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setTransfer = (transfer: Transfer) => {
        transfer.date = transfer.date.split('T')[0];
        this.transferRegistry.set(transfer.id, transfer);
    }

    private getTransfer = (id: string) => {
        return this.transferRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createTransfer = async (transfer: Transfer) => {
        this.loading = true;
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
