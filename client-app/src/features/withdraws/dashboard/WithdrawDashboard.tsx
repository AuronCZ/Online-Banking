import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import WithdrawList from "./WithdrawList";



export default observer (function WithdrawDashboard() {
    const {withdrawStore} = useStore();
    const {loadWithdraws, withdrawRegistry} = withdrawStore;

    useEffect(() => {
        if(withdrawRegistry.size <= 1) loadWithdraws();
      }, [withdrawRegistry.size, loadWithdraws])

      if (withdrawStore.loadingInitial) return <LoadingComponent content='Loading app' />
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <WithdrawList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Withdraw filter</h2>
            </Grid.Column>
        </Grid>
    )
})