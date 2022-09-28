import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Banking System
                </Menu.Item>
                <Menu.Item as={NavLink} to='/accounts' name='Accounts' />
                <Menu.Item as={NavLink} to='/balances' name='Balances' />
                <Menu.Item as={NavLink} to='/bankuser' name="User" />
                <Menu.Item as={NavLink} to='/branches' name="Branch" />
                <Menu.Item as={NavLink} to='/cards' name='Cards' />

                <MenuItem >
                    <Dropdown>
                        <Dropdown.Menu name='Services'>
                            <Dropdown.Item as={NavLink} to='/contact' text="Contact" />
                            <Dropdown.Item as={NavLink} to='/customer' text="Customer" />
                            <Dropdown.Item as={NavLink} to='/deposit' text="Deposit" />
                            <Dropdown.Item as={NavLink} to='/interest' text="Interest" />
                            <Dropdown.Item as={NavLink} to='/loan' text="Loan" />
                            <Dropdown.Item as={NavLink} to='/payment' text="Payment" />
                            <Dropdown.Item as={NavLink} to='/salary' text="Salary" />
                            <Dropdown.Item as={NavLink} to='/transaction' text="Transaction" />
                            <Dropdown.Item as={NavLink} to='/transfers' text='Transfers' />
                            <Dropdown.Item as={NavLink} to='/withdraws' text='Withdraws' />
                            <Dropdown.Item as={NavLink} to='/errors' text='Errors' />
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
                <MenuItem position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
})