import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CardFilters from "./CardFilters";
import CardList from "./CardList";



export default observer (function CardDashboard() {
    const {cardStore} = useStore();
    const {loadCards, cardRegistry} = cardStore;

    useEffect(() => {
        if(cardRegistry.size <= 1) loadCards();
      }, [cardRegistry.size, loadCards])

      if (cardStore.loadingInitial) return <LoadingComponent content='Loading cards...' />
    
    return(
        <Grid>
            <Grid.Column width='10'>
            <Button as={NavLink} to='/createCard' positive content='Create Card' />
                <CardList />
            </Grid.Column>
            <Grid.Column width='6'>
                <CardFilters />
            </Grid.Column>
        </Grid>
    )
})