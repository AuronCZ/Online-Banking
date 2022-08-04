import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Withdraw } from "../../../app/models/withdraw";
import WithdrawDetails from "../details/WithdrawDetails";
import WithdrawForm from "../form/WithdrawForm";
import WithdrawList from "./WithdrawList";


interface Props {
    withdraws: Withdraw[];
    selectedWithdraw: Withdraw | undefined;
    selectWithdraw: (id: string) => void;
    cancelSelectWithdraw: () => void;
}

export default function WithdrawDashboard({withdraws, selectedWithdraw, selectWithdraw, cancelSelectWithdraw}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <WithdrawList withdraws={withdraws} selectWithdraw={selectWithdraw}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedWithdraw &&
                <WithdrawDetails withdraw={selectedWithdraw} cancelSelectWithdraw={cancelSelectWithdraw}/>}
                <WithdrawForm />
            </Grid.Column>
        </Grid>
    )
}