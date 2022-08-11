import axios, { AxiosResponse } from "axios"
import { Account } from "../models/account";
import { Balance } from "../models/balance";
import { Cards } from "../models/card";
import { Transfer } from "../models/transfer";
import { Withdraw } from "../models/withdraw";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;


const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Accounts = {
    list: () => requests.get<Account[]>('/accounts'),
    details: (id: string) => requests.get<Account>(`/accounts/${id}`),
    create: (account: Account) => axios.post<void>('/accounts', account),
    update: (account: Account) => axios.put<void>(`/accounts/${account.id}`, account),
    delete: (id: string) => axios.delete<void>(`/accounts/${id}`)

}
const Balances = {
    list: () => requests.get<Balance[]>('/balances'),
    details: (id: string) => requests.get<Balance>(`/balances/${id}`),
    create: (balance: Balance) => axios.post<void>('/balances', balance),
    update: (balance: Balance) => axios.put<void>(`/balances/${balance.id}`, balance),
    delete: (id: string) => axios.delete<void>(`/balances/${id}`)
}
const Cardss = {
    list: () => requests.get<Cards[]>('/cards'),
    details: (id: string) => requests.get<Cards>(`/cards/${id}`),
    create: (card: Cards) => axios.post<void>('/cards', card),
    update: (card: Cards) => axios.put<void>(`/cards/${card.id}`, card),
    delete: (id: string) => axios.delete<void>(`/cards/${id}`)
}
const Transfers = {
    list: () => requests.get<Transfer[]>('/transfers'),
    details: (id: string) => requests.get<Transfer>(`/transfers/${id}`),
    create: (transfer: Transfer) => axios.post<void>('/transfers', transfer),
    update: (transfer: Transfer) => axios.put<void>(`/transfers/${transfer.id}`, transfer),
    delete: (id: string) => axios.delete<void>(`/transfers/${id}`)
}
const Withdraws = {
    list: () => requests.get<Withdraw[]>('/withdraws'),
    details: (id: string) => requests.get<Withdraw>(`/withdraws/${id}`),
    create: (withdraw: Withdraw) => axios.post<void>('/withdraws', withdraw),
    update: (withdraw: Withdraw) => axios.put<void>(`/withdraws/${withdraw.id}`, withdraw),
    delete: (id: string) => axios.delete<void>(`/withdraws/${id}`)
}

const agent = {
    Accounts,
    Balances,
    Cardss,
    Withdraws,
    Transfers
}

export  default agent;