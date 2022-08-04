import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Account } from "../../../app/models/account";
import AccountDetails from "../details/AccountDetils";
import AccountForm from "../form/AccountForm";
import AccountList from "./AccountList";

interface Props {
    accounts: Account[];
    selectedAccount: Account | undefined;
    selectAccount: (id: string) => void;
    cancelSelectAccount: () => void;
}

export default function AccountDashboard({accounts, selectedAccount, selectAccount, cancelSelectAccount}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <AccountList accounts={accounts} selectAccount={selectAccount}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedAccount &&
                <AccountDetails account={selectedAccount} cancelSelectAccount={cancelSelectAccount} />}
                <AccountForm />
            </Grid.Column>
        </Grid>
    )
}