import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from 'react-calendar';
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function AccountFilters() {
    return(
        <>
            <Header />
            <Calendar />
        </>
    )
})