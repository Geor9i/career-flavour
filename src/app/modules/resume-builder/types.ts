export interface PageValues {
  resize?: string;
  changeFont?: string;
  layout?: GridData;
}

export interface Style {
  [key: string]: string | undefined;
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

export interface SliderControl {
  [key: string]: number
}


export interface layoutData {
  [key: string]: string | TemplateGridStyle
}


export interface GridData {
  [key: string]: string | layoutData[] | layoutData;
}

