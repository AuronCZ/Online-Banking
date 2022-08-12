import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CardDetailedChat from "./CardDetailedChat";
import CardDetailedInfo from "./CardDetailedInfo";
import CardDetailedSidebar from "./CardDetailedSidebar";
import CardDetailedHeader from "./CardDetaledHeader";




export default observer (function CardDetails(){
    const {cardStore} = useStore();
    const {selectedCard: card, loadCard, loadingInitial} = cardStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadCard(id);
    }, [id, loadCard])

    if(loadingInitial || !card) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={10}>
                <CardDetailedHeader card={card} />
                <CardDetailedInfo card={card} />
                <CardDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <CardDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})