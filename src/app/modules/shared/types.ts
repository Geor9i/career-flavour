import { Type } from "@angular/core";

export interface TempModal {
  confirm: boolean;
}

export interface comp {
  component: Type<any>;
  options?: templateModalOptions;
}


export interface templateModalOptions {
  styles?: {[key: string]: string};
  backdropStyles?: {[key: string]: string};
}
