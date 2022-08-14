import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Account} from "../../../app/models/account";
import {format} from 'date-fns';

const accountImageStyle = {
    filter: 'brightness(30%)'
};

const accountImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    account: Account
}

export default observer (function AccountDetailedHeader({account}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/accountImages/${account.accountType}.jpg`} fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={account.accountNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{format(account.openDate!, 'dd MMM yyyy')}</p>
                                <p>
                                   {account.accountType}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Account</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manageAccount/${account.id}`} color='orange' floated='right'>
                    Manage Account
                </Button>
            </Segment>
        </Segment.Group>
    )
})