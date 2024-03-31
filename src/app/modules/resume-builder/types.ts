export interface Styling {
  [key: string]: string;
}

export interface CellRatios {
  rows: number[];
  columns: number[];
}


export interface FontConfig {
  sectionHeading?: Styling;
  topicHeading?: Styling;
  paragraph?: Styling;
}

export interface valueObj {
  [key: string]: string | Styling;
}

export interface PageValues {
  resize?: string;
  changeFont?: valueObj;
  layout?: GridData;
}

export interface StylesGroup {
  [key: string]: Style;
}

export interface Style {
  [key: string]: string | undefined;
}

export type Bin = {
  [key: string]: {
    element: HTMLElement;
    classes: string[];
  };
};

export interface TemplateGridStyle {
  [key: string]: string;
}

export interface SliderControl {
  [key: string]: number;
}

export interface layoutData {
  [key: string]: string | TemplateGridStyle | undefined;
}

export interface GridData {
  [key: string]: string | layoutData[] | layoutData;
}

export interface FontApplicator {
  [key: string]: {
    id: string;
    checked: boolean;
  };
}
