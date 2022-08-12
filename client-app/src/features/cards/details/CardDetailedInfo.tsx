import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Cards} from "../../../app/models/card";

interface Props {
    card: Cards
}

export default observer(function CardDetailedInfo({card}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='book'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{card.cardType}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {card.expirationDate}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})