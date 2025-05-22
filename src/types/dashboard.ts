import { IResponse } from "./response";

export interface Count {
    user:        number;
    transaction: number;
    blog:        number;
    tutorial:    number;
    template:    number;
    faq:number;
}

export interface GetCountDashboardResponse extends IResponse {
    data: {
      count: Count;
    };
}