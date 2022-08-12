import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import WithdrawDetailedChat from "./WithdrawDetailedChat";
import WithdrawDetailedInfo from "./WithdrawDetailedInfo";
import WithdrawDetailedSidebar from "./WithdrawDetailedSidebar";
import WithdrawDetailedHeader from "./WithdrawDetaledHeader";



export default observer (function WithdrawDetails(){
    const {withdrawStore} = useStore();
    const {selectedWithdraw: withdraw, loadWithdraw, loadingInitial} = withdrawStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadWithdraw(id);
    }, [id, loadWithdraw])

    if(loadingInitial || !withdraw) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={10}>
                <WithdrawDetailedHeader withdraw={withdraw} />
                <WithdrawDetailedInfo withdraw={withdraw} />
                <WithdrawDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <WithdrawDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})