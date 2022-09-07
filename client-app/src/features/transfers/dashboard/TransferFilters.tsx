import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from 'react-calendar';
import { Header, Menu } from "semantic-ui-react";

export default observer(function TransferFilters() {
    return(
        <>
            <Header />
            <Calendar />
        </>
    )
})