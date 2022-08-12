import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Cards} from "../../../app/models/card";

const cardImageStyle = {
    filter: 'brightness(30%)'
};

const cardImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    card: Cards
}

export default observer (function CardDetailedHeader({card}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/typeImages/cardImages/${card.cardType}.jpg`} fluid style={cardImageStyle}/>
                <Segment style={cardImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={card.accountNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{card.expirationDate}</p>
                                <p>
                                    {card.cardType}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Card</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                    Manage Card
                </Button>
            </Segment>
        </Segment.Group>
    )
})