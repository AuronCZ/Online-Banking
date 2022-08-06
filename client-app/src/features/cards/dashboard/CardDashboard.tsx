import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CardDetails from "../details/CardDetails";
import CardForm from "../form/CardForm";
import CardList from "./CardList";



export default observer (function CardDashboard() {

    const {cardStore} = useStore();
    const {selectedCard, editMode} = cardStore;
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <CardList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCard && !editMode &&
                <CardDetails />}
                {editMode &&
                <CardForm  />}
            </Grid.Column>
        </Grid>
    )
})