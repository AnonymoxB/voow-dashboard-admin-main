import { CategoryTutorial } from "./categoryTutorial";
import { IResponse } from "./response";
import { IAdminData } from "./user";

export interface ITutorial {
  id?: string;
  category_id: string;
  title: string;
  content: string;
  image?: string;
  link_youtube?: string;
  status?: string;
  lang?: string;
}

export interface Tutorial {
  id: number;
  user_id: number;
  tutorial_category_id: number;
  title: string;
  image: string;
  slug: string;
  content: string;
  link_youtube: string;
  status: string;
  lang: string;
  parent_id: null;
  deleted_at: null;
  created_at: null;
  updated_at: null;
  user: IAdminData;
  tutorial_category: CategoryTutorial;
}

export interface ResponseTutorial extends IResponse {
  data: {
    items: Tutorial;
  };
}

export interface ShowResponseTutorial extends IResponse {
  data: {
    item: Tutorial;
  };
}

export interface TutorialValidation {
  category_id: string[];
  title: string[];
  image: string[];
  content: string[];
  link_youtube: string[];
  status: string[];
}

export interface ResponseTutorialValidation extends IResponse {
  data: TutorialValidation;
}
