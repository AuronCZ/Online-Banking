import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Cards } from "../models/card";
import {v4 as uuid} from 'uuid';

export default class CardStore {
    cardRegistry = new Map<string, Cards>();
    selectedCard: Cards | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get cardsByDate() {
        return Array.from(this.cardRegistry.values()).sort((a, b) => Date.parse(a.expirationDate) - Date.parse(b.expirationDate));
    }

    loadCards = async () => {
        try {
            const cards = await agent.Cardss.list();
            cards.forEach(card =>{
                card.expirationDate = card.expirationDate.split('T')[0];
                this.cardRegistry.set(card.id, card);
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

    selectCard = (id: string) => {
        this.selectedCard = this.cardRegistry.get(id);
    }

    cancelSelectedCard = () => {
        this.selectedCard = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectCard(id) : this.cancelSelectedCard();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createCard = async (card: Cards) => {
        this.loading = true;
        card.id = uuid();
        try {
            await agent.Cardss.create(card);
            runInAction(() => {
                this.cardRegistry.set(card.id, card);
                this.selectedCard = card;
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

    updateCard = async (card: Cards) => {
        this.loading = true;
        try {
            await agent.Cardss.update(card);
            runInAction(() => {
                this.cardRegistry.set(card.id, card);
                this.selectedCard = card;
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

    deleteCard = async (id: string) => {
        this.loading = true;
        try {
            await agent.Cardss.delete(id);
            runInAction(() => {
                this.cardRegistry.delete(id);
                if (this.selectedCard?.id === id) this.cancelSelectedCard();
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
