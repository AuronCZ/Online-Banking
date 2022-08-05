import React from "react";
import { Grid } from "semantic-ui-react";
import { Cards } from "../../../app/models/card";
import CardDetails from "../details/CardDetails";
import CardForm from "../form/CardForm";
import CardList from "./CardList";


interface Props {
    cards: Cards[];
    selectedCard: Cards | undefined;
    selectCard: (id: string) => void;
    cancelSelectCard: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit:  (card: Cards) => void;
    deleteCard: (id: string) => void;
}

export default function CardDashboard({cards, selectedCard, selectCard, cancelSelectCard, editMode, openForm, closeForm, createOrEdit, deleteCard}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <CardList cards={cards} 
                    selectCard={selectCard}
                    deleteCard={deleteCard}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCard &&
                <CardDetails 
                    card={selectedCard}  
                    cancelSelectCard={cancelSelectCard}
                    openForm={openForm}
                />}
                {editMode &&
                <CardForm closeForm={closeForm} card={selectedCard} createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
}