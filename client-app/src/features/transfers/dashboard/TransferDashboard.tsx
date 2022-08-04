import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Transfer } from "../../../app/models/transfer";
import TransferDetails from "../details/TransferDetails";
import TransferForm from "../form/TransferForm";
import TransferList from "./TransferList";


interface Props {
    transfers: Transfer[];
    selectedTransfer: Transfer | undefined;
    selectTransfer: (id: string) => void;
    cancelSelectTransfer: () => void;    
}

export default function TransferDashboard({transfers, selectedTransfer, selectTransfer, cancelSelectTransfer}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <TransferList  transfers={transfers} selectTransfer={selectTransfer}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTransfer &&
                <TransferDetails transfer={selectedTransfer} cancelSelectTransfer={cancelSelectTransfer}/>}
                <TransferForm />
            </Grid.Column>
        </Grid>
    )
}