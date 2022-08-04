import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Balance } from "../../../app/models/balance";
import BalanceDetails from "../details/BalanceDetails";
import BalanceForm from "../form/BalanceForm";
import BalanceList from "./BalanceList";


interface Props {
    balances: Balance[];
    selectedBalance: Balance | undefined;
    selectBalance: (id: string) => void;
    cancelSelectBalance: () => void;
}

export default function BalanceDashboard({balances, selectedBalance, selectBalance, cancelSelectBalance}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <BalanceList balances={balances} selectBalance={selectBalance}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedBalance &&
                <BalanceDetails balance={selectedBalance} cancelSelectBalance={cancelSelectBalance}/>}
                <BalanceForm />
            </Grid.Column>
        </Grid>
    )
}