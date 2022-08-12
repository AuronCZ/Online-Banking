import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import AccountDetailedChat from "./AccountDetailedChat";
import AccountDetailedInfo from "./AccountDetailedInfo";
import AccountDetailedSidebar from "./AccountDetailedSidebar";
import AccountDetailedHeader from "./AccountDetaledHeader";


export default observer (function AccountDetails(){
    const {accountStore} = useStore();
    const {selectedAccount: account, loadAccount, loadingInitial} = accountStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount])

    if(loadingInitial || !account) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={10}>
                <AccountDetailedHeader account={account} />
                <AccountDetailedInfo account={account}/>
                <AccountDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <AccountDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})