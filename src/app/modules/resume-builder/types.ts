

export interface CellRatios {
  rows: number[];
  columns: number[];
}

export interface FontStyling {
  fontFamily: string;
  fontSize: string;
  applicators?: string[];
  baseSize?: string;
  font?: string;
}

export interface FontConfig {
  [key: string]: FontStyling | undefined;
  sectionHeading?: FontStyling;
  topicHeading?: FontStyling;
  paragraph?: FontStyling;
}

export interface FontGroup {
  [key: string]: Style ;
  sectionHeading: Style;
  topicHeading: Style;
  paragraph: Style;
}


export interface valueObj {
  [key: string]: string | FontStyling;
}

export interface PageValues {
  resize?: string;
  changeFont?: FontStyling;
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

export interface IdObj {
  [key: string]: string;
}

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
