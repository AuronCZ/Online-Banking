import React from "react";
import { Grid } from "semantic-ui-react";
import { Withdraw } from "../../../app/models/withdraw";
import WithdrawDetails from "../details/WithdrawDetails";
import WithdrawForm from "../form/WithdrawForm";
import WithdrawList from "./WithdrawList";


interface Props {
    withdraws: Withdraw[];
    selectedWithdraw: Withdraw | undefined;
    selectWithdraw: (id: string) => void;
    cancelSelectWithdraw: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit:  (withdraw: Withdraw) => void;
    deleteWithdraw: (id: string) => void;
    submitting: boolean;
}

export default function WithdrawDashboard({withdraws, selectedWithdraw, selectWithdraw, cancelSelectWithdraw, editMode, openForm, closeForm, createOrEdit, deleteWithdraw, submitting}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <WithdrawList withdraws={withdraws} 
                    selectWithdraw={selectWithdraw}
                    deleteWithdraw={deleteWithdraw}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedWithdraw &&
                <WithdrawDetails 
                    withdraw={selectedWithdraw} 
                    cancelSelectWithdraw={cancelSelectWithdraw}
                    openForm={openForm}
                />}
                {editMode &&
                <WithdrawForm 
                    closeForm={closeForm} 
                    withdraw={selectedWithdraw} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}