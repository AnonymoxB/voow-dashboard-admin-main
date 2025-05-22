import { IResponse } from "./response";

export interface CategoryBlog {
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

export interface ResponseCategoryBlog extends IResponse {
  data: {
    items: CategoryBlog;
  };
}

export interface ResponseCategoryBlogShow extends IResponse {
  data: {
    item: CategoryBlog;
  };
}

export interface ICategoryBlogStore {
    id?:number,
    title : string,
    description? : string,
    lang :string
}
