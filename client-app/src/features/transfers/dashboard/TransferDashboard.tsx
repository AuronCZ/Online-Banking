import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TransferDetails from "../details/TransferDetails";
import TransferForm from "../form/TransferForm";
import TransferList from "./TransferList";



export default observer (function TransferDashboard() {

    const {transferStore} = useStore();
    const {selectedTransfer, editMode} = transferStore;
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <TransferList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTransfer && !editMode &&
                <TransferDetails />}
                {editMode &&
                <TransferForm />}
            </Grid.Column>
        </Grid>
    )
})