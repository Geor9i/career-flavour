export interface PageValues {
  resize?: string;
  changeFont?: string;
}

export interface Style {
  [key: string]: string;
}

export type Bin = {
  [key: string]: {
    element: HTMLElement;
    classes: string[];
  }
};


export interface TemplateGridStyle {
  [key: string]: string
}
