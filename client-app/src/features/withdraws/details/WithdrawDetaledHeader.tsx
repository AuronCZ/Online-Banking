import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Withdraw} from "../../../app/models/withdraw";

const withdrawImageStyle = {
    filter: 'brightness(30%)'
};

const withdrawImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    withdraw: Withdraw
}

export default observer (function WithdrawDetailedHeader({withdraw}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/withdrawImages/${withdraw.amount}.jpg`} fluid style={withdrawImageStyle}/>
                <Segment style={withdrawImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={withdraw.accountNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{withdraw.date}</p>
                                <p>
                                    {withdraw.amount}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Withdraw</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                    Manage Withdraw
                </Button>
            </Segment>
        </Segment.Group>
    )
})