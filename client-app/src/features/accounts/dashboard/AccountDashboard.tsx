import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AccountDetails from "../details/AccountDetils";
import AccountForm from "../form/AccountForm";
import AccountList from "./AccountList";


export default observer (function AccountDashboard() {

    const {accountStore} = useStore();
    const {selectedAccount, editMode} = accountStore;

    return(
        <Grid>
            <Grid.Column width='10'>
                <AccountList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedAccount && !editMode &&
                <AccountDetails />}
                {editMode &&
                <AccountForm />}
            </Grid.Column>
        </Grid>
    )
})