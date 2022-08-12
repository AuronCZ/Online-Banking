import React from "react";
import Calendar from 'react-calendar';
import { Header, Menu } from "semantic-ui-react";

export default function AccountFilters() {
    return(
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 20}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Accounts' />
                <Menu.Item content="I'm using" />
                <Menu.Item content="I'm managing" />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}