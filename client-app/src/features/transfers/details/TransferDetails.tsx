import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TransferDetailedChat from "./TransferDetailedChat";
import TransferDetailedInfo from "./TransferDetailedInfo";
import TransferDetailedSidebar from "./TransferDetailedSidebar";
import TransferDetailedHeader from "./TransferDetaledHeader";




export default observer (function TransferDetails(){
    const {transferStore} = useStore();
    const {selectedTransfer: transfer, loadTransfer, loadingInitial} = transferStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadTransfer(id);
    }, [id, loadTransfer])

    if(loadingInitial || !transfer) return <LoadingComponent />;
    
    return(
        <Grid>
            <Grid.Column width={10}>
                <TransferDetailedHeader transfer={transfer} />
                <TransferDetailedInfo transfer={transfer} />
                <TransferDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <TransferDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})