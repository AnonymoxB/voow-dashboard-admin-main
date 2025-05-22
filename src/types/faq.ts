export interface Ifaq {
    id?: string,
    question? : string,
    answer? : string,
    lang? : string,
    status?:string
}


export interface DataRow {
    id: BigInteger;
    question: string;
    answer: string;
    lang: string;
    status: string;
    parent_id: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
}

export interface DeleteFaq{
    id:BigInteger
}

export interface DetailFaq{
    id:BigInteger
}
