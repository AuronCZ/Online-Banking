import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Transfer} from "../../../app/models/transfer";
import {format} from 'date-fns';

const transferImageStyle = {
    filter: 'brightness(30%)'
};

const transferImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    transfer: Transfer
}

export default observer (function TransferDetailedHeader({transfer}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/accountImages/${transfer.amount}.jpg`} fluid style={transferImageStyle}/>
                <Segment style={transferImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={transfer.transferNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{format(transfer.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    {transfer.amount}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Transfer</Button>
                <Button>Cancel attendance</Button>
                <Button  as={Link} to={`/manageTransfer/${transfer.id}`} color='orange' floated='right'>
                    Manage Transfer
                </Button>
            </Segment>
        </Segment.Group>
    )
})