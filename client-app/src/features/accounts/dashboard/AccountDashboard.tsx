import React from "react";
import { Grid } from "semantic-ui-react";
import { Account } from "../../../app/models/account";
import AccountDetails from "../details/AccountDetils";
import AccountForm from "../form/AccountForm";
import AccountList from "./AccountList";

interface Props {
    accounts: Account[];
    selectedAccount: Account | undefined;
    selectAccount: (id: string) => void;
    cancelSelectAccount: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit:  (account: Account) => void;
    deleteAccount: (id: string) => void;
}

export default function AccountDashboard({accounts, selectedAccount, selectAccount, cancelSelectAccount, editMode, openForm, closeForm, createOrEdit, deleteAccount}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <AccountList accounts={accounts} 
                    selectAccount={selectAccount}
                    deleteAccount={deleteAccount}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedAccount && !editMode &&
                <AccountDetails 
                    account={selectedAccount} 
                    cancelSelectAccount={cancelSelectAccount}
                    openForm={openForm} 
                />}
                {editMode &&
                <AccountForm  closeForm={closeForm} account={selectedAccount} createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
}