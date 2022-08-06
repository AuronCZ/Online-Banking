import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import WithdrawDetails from "../details/WithdrawDetails";
import WithdrawForm from "../form/WithdrawForm";
import WithdrawList from "./WithdrawList";



export default observer (function WithdrawDashboard() {

    const {withdrawStore} = useStore();
    const {selectedWithdraw, editMode} = withdrawStore;
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <WithdrawList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedWithdraw && !editMode &&
                <WithdrawDetails />}
                {editMode &&
                <WithdrawForm  />}
            </Grid.Column>
        </Grid>
    )
})