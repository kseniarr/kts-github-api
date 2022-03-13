import qs from "qs";

import {
    IApiStore,
    RequestParams,
    ApiResponse,
    HTTPMethod,
    StatusHTTP,
} from "./types";

export default class ApiStore implements IApiStore {
    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        // и присвойте его в this.baseUrl
        this.baseUrl = baseUrl;
    }
    readonly baseUrl: string;

    async request<SuccessT, ErrorT = any, ReqT = {}>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос
        let data = qs.stringify(params.data);
        try {
            switch (params.method) {
                case HTTPMethod.GET: {
                    let keys = qs.parse(data);
                    let url = `${this.baseUrl}/orgs/${keys["org"]}/repos?per_page=${keys["per_page"]}&page=${keys["page"]}`;
                    if (Object.keys(keys).length === 2) {
                        url = `${this.baseUrl}/repos/${keys["orgName"]}/${keys["repoName"]}/branches`;
                    }
                    const response = await fetch(url, params);
                    if (response.ok) {
                        return {
                            success: true,
                            data: await response.json(),
                            status: StatusHTTP.OK,
                        };
                    } else {
                        return {
                            success: false,
                            data: await response.json(),
                            status: response.status,
                        };
                    }
                }
                case HTTPMethod.POST: {
                    let bodyData = JSON.stringify(qs.parse(data));

                    const response = await fetch(
                        this.baseUrl + params.endpoint,
                        {
                            ...params,
                            body: bodyData,
                        }
                    );
                    if (response.ok) {
                        return {
                            success: true,
                            data: await response.json(),
                            status: StatusHTTP.OK,
                        };
                    } else {
                        return {
                            success: false,
                            data: await response.json(),
                            status: response.status,
                        };
                    }
                }
            }
        } catch (error) {
            return {
                success: false,
                data: error,
                status: StatusHTTP.SERVER_ERROR,
            };
        }
    }
}
