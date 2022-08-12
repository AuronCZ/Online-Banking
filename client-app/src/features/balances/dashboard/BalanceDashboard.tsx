import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BalanceFilters from "./BalanceFilters";
import BalanceList from "./BalanceList";



export default observer (function BalanceDashboard() {
    const {balanceStore} = useStore();
    const {loadBalances, balanceRegistry} = balanceStore;

    useEffect(() => {
        if(balanceRegistry.size <= 1) loadBalances();
      }, [balanceRegistry.size, loadBalances])

      if (balanceStore.loadingInitial) return <LoadingComponent content='Loading app' />
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <Button as={NavLink} to='/createBalance' positive content='Create Balance' />
                <BalanceList />
            </Grid.Column>
            <Grid.Column width='6'>
                <BalanceFilters />
            </Grid.Column>
        </Grid>
    )
})