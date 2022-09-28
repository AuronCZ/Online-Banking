import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import LoanDetailedInfo from "./LoanDetailedInfo";
import AccountDetailedInfo from "./LoanDetailedInfo";
import LoanDetaledHeader from "./LoanDetaledHeader";
import AccountDetailedHeader from "./LoanDetaledHeader";


export default observer (function LoanDetails(){
    const {loanStore} = useStore();
    const {selectedLoan: loan, loadLoan, loadingInitial} = loanStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadLoan(id);
    }, [id, loadLoan])

    if(loadingInitial || !loan) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={9}>
                <LoanDetaledHeader loan={loan} />
            </Grid.Column>
            <Grid.Column width={7}>
                <LoanDetailedInfo loan={loan}/>
            </Grid.Column>
        </Grid>
    )
})