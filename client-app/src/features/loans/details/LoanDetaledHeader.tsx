import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Account} from "../../../app/models/account";
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Loan } from '../../../app/models/loan';

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
    loan:Loan
}

export default observer (function LoanDetailedHeader({loan}: Props) {
    const {loanStore} = useStore();
    const {deleteLoan,loading} = loanStore;
    const [target,setTarget] = useState('');

    function handleLoanDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteLoan(id);
    }
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src='/assets/typeImages/logoImages/logo.png' fluid style={accountImageStyle}/>
                <Segment style={accountImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={loan.name}
                                    style={{color: 'white'}}
                                />
                                <p>{format(loan.loanDate!, 'dd MMM yyyy')}</p>
                                <p>
                                    {loan.surname}
                                    {loan.accNumber}
                                    {loan.type}
                                    {loan.amount}
                                    {loan.duration}
                                    {loan.payments}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button 
                    name={loan.id}
                    loading={loading && target === loan.id} 
                    onClick={(e) => handleLoanDelete(e,loan.id)} 
                    as={Link} to='/loan'  content="Delete" color='red' floated='right' />
                <Button as={Link} to={`/manageLoan/${loan.id}`} color='blue' floated='left'>
                    Manage Account
                </Button>
            </Segment>
        </Segment.Group>
    )
})