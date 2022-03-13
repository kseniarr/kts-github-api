export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
}

export type RequestParams<ReqT> = {
    method: HTTPMethod;
    endpoint: string;
    headers: Record<string, string>;
    data: ReqT;
};

export enum StatusHTTP {
    OK = 200,
    MOVED_PERMANENTLY = 301,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    SERVER_ERROR = 500,
}

export type ApiResponse<SuccessT, ErrorT> =
    | {
          success: true;
          data: SuccessT;
          status: StatusHTTP;
      }
    | {
          success: false;
          data: ErrorT;
          status: StatusHTTP;
      }
    | {
          success: false;
          data: any;
          status: StatusHTTP;
      };

export interface IApiStore {
    readonly baseUrl: string;

    request<SuccessT, ErrorT = any, ReqT = {}>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>>;
}
