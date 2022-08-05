import React from "react";
import { Grid } from "semantic-ui-react";
import { Balance } from "../../../app/models/balance";
import BalanceDetails from "../details/BalanceDetails";
import BalanceForm from "../form/BalanceForm";
import BalanceList from "./BalanceList";


interface Props {
    balances: Balance[];
    selectedBalance: Balance | undefined;
    selectBalance: (id: string) => void;
    cancelSelectBalance: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit:  (balance: Balance) => void;
    deleteBalance: (id: string) => void;
    submitting: boolean;
}

export default function BalanceDashboard({balances, selectedBalance, selectBalance, cancelSelectBalance, editMode, openForm, closeForm, createOrEdit, deleteBalance, submitting}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <BalanceList balances={balances} 
                    selectBalance={selectBalance}
                    deleteBalance={deleteBalance}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedBalance &&
                <BalanceDetails 
                    balance={selectedBalance} 
                    cancelSelectBalance={cancelSelectBalance}
                    openForm={openForm}
                />}
                {editMode &&
                <BalanceForm 
                    closeForm={closeForm} 
                    balance={selectedBalance} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}