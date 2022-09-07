import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify";
import { history } from "../..";
import { Account } from "../models/account";
import { Balance } from "../models/balance";
import { Cards } from "../models/card";
import { PaginatedResult } from "../models/pagination";
import { Profile } from "../models/profile";
import { Transfer } from "../models/transfer";
import { User, UserFormValues } from "../models/user";
import { Withdraw } from "../models/withdraw";
import { store } from "../stores/store";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const {data, status, config}: any = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;


const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Accounts = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Account[]>>('/accounts', {params}).then(responseBody),
    details: (id: string) => requests.get<Account>(`/accounts/${id}`),
    create: (account: Account) => requests.post<void>('/accounts', account),
    update: (account: Account) => requests.put<void>(`/accounts/${account.id}`, account),
    delete: (id: string) => requests.del<void>(`/accounts/${id}`)

}
const Balances = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Balance[]>>('/balances', {params}).then(responseBody),
    details: (id: string) => requests.get<Balance>(`/balances/${id}`),
    create: (balance: Balance) => requests.post<void>('/balances', balance),
    update: (balance: Balance) => requests.put<void>(`/balances/${balance.id}`, balance),
    delete: (id: string) => requests.del<void>(`/balances/${id}`)
}
const Cardss = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Cards[]>>('/cards', {params}).then(responseBody),
    details: (id: string) => requests.get<Cards>(`/cards/${id}`),
    create: (card: Cards) => requests.post<void>('/cards', card),
    update: (card: Cards) => requests.put<void>(`/cards/${card.id}`, card),
    delete: (id: string) => requests.del<void>(`/cards/${id}`)
}
const Transfers = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Transfer[]>>('/transfers', {params}).then(responseBody),
    details: (id: string) => requests.get<Transfer>(`/transfers/${id}`),
    create: (transfer: Transfer) => requests.post<void>('/transfers', transfer),
    update: (transfer: Transfer) => requests.put<void>(`/transfers/${transfer.id}`, transfer),
    delete: (id: string) => requests.del<void>(`/transfers/${id}`)
}
const Withdraws = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Withdraw[]>>('/withdraws', {params}).then(responseBody),
    details: (id: string) => requests.get<Withdraw>(`/withdraws/${id}`),
    create: (withdraw: Withdraw) => requests.post<void>('/withdraws', withdraw),
    update: (withdraw: Withdraw) => requests.put<void>(`/withdraws/${withdraw.id}`, withdraw),
    delete: (id: string) => requests.del<void>(`/withdraws/${id}`)
}

const UserAccount = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile)
}

const agent = {
    Accounts,
    Balances,
    Cardss,
    Withdraws,
    Transfers,
    UserAccount,
    Profiles
}

export  default agent;