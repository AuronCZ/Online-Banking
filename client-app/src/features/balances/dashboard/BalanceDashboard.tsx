import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import BalanceDetails from "../details/BalanceDetails";
import BalanceForm from "../form/BalanceForm";
import BalanceList from "./BalanceList";



export default observer (function BalanceDashboard() {

    const {balanceStore} = useStore();
    const {selectedBalance, editMode} = balanceStore;
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <BalanceList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedBalance && !editMode &&
                <BalanceDetails />}
                {editMode &&
                <BalanceForm />}
            </Grid.Column>
        </Grid>
    )
})