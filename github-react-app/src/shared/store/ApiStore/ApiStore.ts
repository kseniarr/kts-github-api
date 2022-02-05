import {ApiResponse, IApiStore, RequestParams} from "./types";

export default class ApiStore implements IApiStore {
    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        // и присвойте его в this.baseUrl
        this.baseUrl = baseUrl;
    }
    baseUrl: string; 

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос
        console.log(this.baseUrl + params.endpoint);
        return fetch(this.baseUrl + params.endpoint, params).then((response) => {
            if(response.ok) return response.json();
            else throw response;
        });
    }
}