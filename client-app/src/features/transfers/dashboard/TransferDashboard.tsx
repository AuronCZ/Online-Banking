import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TransferFilters from "./TransferFilters";
import TransferList from "./TransferList";



export default observer (function TransferDashboard() {
    const {transferStore} = useStore();
    const {loadTransfers, transferRegistry} = transferStore;

    useEffect(() => {
        if(transferRegistry.size <= 1) loadTransfers();
      }, [transferRegistry.size, loadTransfers])

      if (transferStore.loadingInitial) return <LoadingComponent content='Loading app' />
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <Button as={NavLink} to='/createTransfer' positive content='Create Transfer' />
                <TransferList />
            </Grid.Column>
            <Grid.Column width='6'>
                <TransferFilters />
            </Grid.Column>
        </Grid>
    )
})