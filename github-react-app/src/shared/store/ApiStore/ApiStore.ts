import { visitParameterList } from "typescript";
import {ApiResponse, HTTPMethod, IApiStore, RequestParams} from "./types";
import QueryString from "qs";
import qs from "qs";

export default class ApiStore implements IApiStore {
    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        // и присвойте его в this.baseUrl
        this.baseUrl = baseUrl;
    }
    readonly baseUrl: string; 

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос
        let data = qs.stringify(params.data);
        switch(params.method){
            case HTTPMethod.GET: {
                let org = qs.parse(data);
                let url = `${this.baseUrl}/orgs/${org['org']}/repos`;

                return fetch(url, params).then((response) => {
                    if(response.ok) return response.json();
                    else throw response;
                }).catch((err) => console.log(err)); 
            }
            case HTTPMethod.POST: {
                let bodyData = JSON.stringify(qs.parse(data));
                return fetch(this.baseUrl + params.endpoint, {...params, body: bodyData}).then((response) => {
                    if(response.ok) return response.json();
                    else throw response;
                }).catch((err) => console.log(err));
            }
        }
    }
}