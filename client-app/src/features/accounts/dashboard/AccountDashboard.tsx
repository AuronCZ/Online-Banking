import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import AccountList from "./AccountList";


export default observer (function AccountDashboard() {
    const {accountStore} = useStore();

    useEffect(() => {
      accountStore.loadAccounts();
    }, [accountStore])

  if (accountStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return(
        <Grid>
            <Grid.Column width='10'>
                <AccountList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Account filter</h2>
            </Grid.Column>
        </Grid>
    )
})