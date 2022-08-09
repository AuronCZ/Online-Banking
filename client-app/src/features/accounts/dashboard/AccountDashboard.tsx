import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import AccountList from "./AccountList";


export default observer (function AccountDashboard() {
    const {accountStore} = useStore();
    const {loadAccounts, accountRegistry} = accountStore;

    useEffect(() => {
      if(accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])

  if (accountStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return(
        <Grid>
            <Grid.Column width='10'>
                <Button as={NavLink} to='/createAccount' positive content='Create Account' />
                <AccountList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Account filter</h2>
            </Grid.Column>
        </Grid>
    )
})