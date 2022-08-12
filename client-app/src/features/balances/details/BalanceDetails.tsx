import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BalanceDetailedChat from "./BalanceDetailedChat";
import BalanceDetailedInfo from "./BalanceDetailedInfo";
import BalanceDetailedSidebar from "./BalanceDetailedSidebar";
import BalanceDetailedHeader from "./BalanceDetaledHeader";



export default observer (function BalanceDetails(){
    const {balanceStore} = useStore();
    const {selectedBalance: balance, loadBalance, loadingInitial} = balanceStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadBalance(id);
    }, [id, loadBalance])

    if(loadingInitial || !balance) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={10}>
                <BalanceDetailedHeader balance={balance} />
                <BalanceDetailedInfo balance={balance}/>
                <BalanceDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <BalanceDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})