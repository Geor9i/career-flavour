export interface PageValues {
  resize?: string;
  changeFont?: string;
}

export interface Style {
  [key: string]: string;
}

export type Bin = {
  element: HTMLElement;
  classes: string[];
}[];
