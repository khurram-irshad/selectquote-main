import axios from 'axios';

export class Http {
    post(url: string, model: any) {
        return axios.post(url, model)
    }
    get(url: string) {
        return axios.get(url)
    }
}

export const HttpService = new Http();