import React from "react";
import { Grid } from "semantic-ui-react";
import { Transfer } from "../../../app/models/transfer";
import TransferDetails from "../details/TransferDetails";
import TransferForm from "../form/TransferForm";
import TransferList from "./TransferList";


interface Props {
    transfers: Transfer[];
    selectedTransfer: Transfer | undefined;
    selectTransfer: (id: string) => void;
    cancelSelectTransfer: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit:  (transfer: Transfer) => void; 
    deleteTransfer: (id: string) => void;
    submitting: boolean;   
}

export default function TransferDashboard({transfers, selectedTransfer, selectTransfer, cancelSelectTransfer, editMode, openForm, closeForm, createOrEdit, deleteTransfer, submitting}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <TransferList  transfers={transfers} 
                    selectTransfer={selectTransfer}
                    deleteTransfer={deleteTransfer}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTransfer &&
                <TransferDetails
                    transfer={selectedTransfer}
                    cancelSelectTransfer={cancelSelectTransfer}
                    openForm={openForm}
                />}
                {editMode &&
                <TransferForm 
                    closeForm={closeForm} 
                    transfer={selectedTransfer} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}