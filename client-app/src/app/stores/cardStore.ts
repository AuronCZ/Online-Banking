import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Cards } from "../models/card";


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

    get groupedCards() {
        return Object.entries(
            this.cardsByDate.reduce((cards, card) => {
                const date = card.expirationDate;
                cards[date] = cards[date] ? [...cards[date], card] : [card];
                return cards;
            }, {} as {[key: string]: Cards[]})
        )
    }

    loadCards = async () => {
        this.loadingInitial = true;
        try {
            const cards = await agent.Cardss.list();
            cards.forEach(card =>{
                this.setCard(card);
              })
              this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadCard = async (id: string) => {
        let card = this.getCard(id);
        if (card) {
            this.selectedCard = card;
            return card;
        } else {
            this.loadingInitial = true;
            try {
                card = await agent.Cardss.details(id);
                this.setCard(card);
                runInAction(() => {
                    this.selectedCard = card;
                })
                this.setLoadingInitial(false);
                return card;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setCard = (card: Cards) => {
        card.expirationDate = card.expirationDate.split('T')[0];
        this.cardRegistry.set(card.id, card);
    }

    private getCard = (id: string) => {
        return this.cardRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createCard = async (card: Cards) => {
        this.loading = true;
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
