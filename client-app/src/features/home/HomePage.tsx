import React from "react"; 
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
    return(
        <Container style={{marginTop: '7em'}}>
        <h1>Home page</h1>
        <h3>Go to <Link to='accounts'>Accounts</Link></h3>
        <h3>Go to <Link to='balances'>Balances</Link></h3>
        <h3>Go to <Link to='cards'>Cards</Link></h3>
        <h3>Go to <Link to='transfers'>Transfers</Link></h3>
        <h3>Go to <Link to='withdraws'>Withdraws</Link></h3>
        </Container>
    )
}