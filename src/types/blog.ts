import { CategoryBlog } from "./categoryBlog";
import { IResponse } from "./response";
import { IAdminData } from "./user";

export interface Blog {
    id:               number;
    user_id:          number;
    blog_category_id: number;
    title:            string;
    image:            string;
    slug:             string;
    content:          string;
    status:           string;
    lang:             string;
    parent_id:        string;
    deleted_at:       string;
    created_at:       string;
    updated_at:       string;
    user:             IAdminData;
    blog_category:    CategoryBlog;
}

export interface ResponseBlog extends IResponse {
    data: {
      items: Blog;
    };
}

export interface ShowResponseBlog extends IResponse {
    data: {
      item: Blog;
    };
  }
  

export interface IBlog {
    id?: string;
    category_id: string;
    title: string;
    content: string;
    image?: string;
    status?: string;
    lang?: string;
  }
  