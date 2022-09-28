import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { accountCategoryOptions } from "../../../app/common/options/accountCategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Account } from "../../../app/models/account";
import { Customer } from "../../../app/models/customer";
import { customerCategoryOptions } from "../../../app/common/options/customerCategoryOptions";


export default observer(function CustomerForm() {
    const history = useHistory();
    const {customerStore} = useStore();
    const {createCustomer,updateCustomer,loading,loadCustomer,loadingInitial} = customerStore;
    const {id} = useParams<{id:string}>();
   const [customer,setCustomer]= useState<Customer>({
    id: '',
    name: '',
    surname: '',
    address:'',
    email:'',
    tel: '',
    birthDate: null,
    gender: '',
    bank: '',
    accNumber:''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The account name is required'),
        surname: Yup.string().required('The account surname is required'),
        accountNumber: Yup.string().required(),
        accountType: Yup.string().required(),
        openDate: Yup.string().required('Date is required').nullable(),
        balance: Yup.string().required(),
    })

   

    useEffect(() =>{
        if (id) loadCustomer(id).then(customer => setCustomer(customer!));
    },[id,loadCustomer])


    function handleFormSubmit(customer : Customer){

        if(customer.id.length === 0 ){
            let newCustomer ={
                ...customer,
                id:uuid()
            };

            createCustomer(newCustomer).then(() => history.push(`/customer/${newCustomer.id}`))
        }else{
            updateCustomer(customer).then(() => history.push(`/customer/${customer.id}`))

        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading account...' />

    return (
        <Segment clearing>
            <Header content='Customer Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={customer} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput  placeholder="Name"  name="name"/>
                <MyTextInput placeholder="Surname" name="surname" />
                <MyTextInput placeholder="Address"  name="address" />
                <MyTextInput type="email" placeholder="Email"  name="email"/>
                <MyTextInput placeholder="Telephone Number"  name="tel"/>
                       
                        <MyDateInput
                            placeholderText='Birth Date' 
                            name='birthDate'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            />
                             <MySelectInput options={customerCategoryOptions} placeholder='Gender' name='gender'  />
                <MyTextInput placeholder="Bank"  name="bank" />
                <MyTextInput  placeholder="Account Number"  name="accNumber"/>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/accounts' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})