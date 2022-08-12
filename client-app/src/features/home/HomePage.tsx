import React from "react"; 
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage() {
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Online Banking
                </Header>
                <Header as='h2' inverted content='Welcome to Online Banking' />
                <Button as={Link} to='/accounts' size='huge' inverted>
                    Take me to Accounts!
                </Button>
                <Button as={Link} to='/balances' size='huge' inverted>
                    Take me to Balances!
                </Button>
                <Button as={Link} to='/cards' size='huge' inverted>
                    Take me to Cards!
                </Button>
                <Button as={Link} to='/transfers' size='huge' inverted>
                    Take me to Transfers!
                </Button>
                <Button as={Link} to='/withdraws' size='huge' inverted>
                    Take me to Withdraws!
                </Button>
            </Container>
        </Segment>
    )
}