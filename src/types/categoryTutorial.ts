import { IResponse } from "./response";

export interface CategoryTutorial {
  id: number;
  title: string;
  slug: string;
  description: string;
  lang: string;
  parent_id: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ResponseCategoryTutorial extends IResponse {
  data: {
    items: CategoryTutorial;
  };
}

export interface ResponseCategoryTutorialShow extends IResponse {
  data: {
    item: CategoryTutorial;
  };
}

export interface ICategoryTutorialStore {
    id?:number,
    title : string,
    description? : string,
    lang :string
}
