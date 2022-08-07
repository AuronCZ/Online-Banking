import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BalanceList from "./BalanceList";



export default observer (function BalanceDashboard() {
    const {balanceStore} = useStore();

    useEffect(() => {
        balanceStore.loadBalances();
      }, [balanceStore])

      if (balanceStore.loadingInitial) return <LoadingComponent content='Loading app' />
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <BalanceList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Balance filter</h2>
            </Grid.Column>
        </Grid>
    )
})