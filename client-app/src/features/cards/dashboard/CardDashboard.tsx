import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Cards } from "../../../app/models/card";
import CardDetails from "../details/CardDetails";
import CardForm from "../form/CardForm";
import CardList from "./CardList";


interface Props {
    cards: Cards[];
    selectedCard: Cards | undefined;
    selectCard: (id: string) => void;
    cancelSelectCard: () => void;
}

export default function CardDashboard({cards, selectedCard, selectCard, cancelSelectCard}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <CardList cards={cards} selectCard={selectCard}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCard &&
                <CardDetails card={selectedCard}  cancelSelectCard={cancelSelectCard}/>}
                <CardForm />
            </Grid.Column>
        </Grid>
    )
}