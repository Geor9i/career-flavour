import { Style } from "../modules/resume-builder/types";

export const resumeConstants = {
  SHEET_ASPECT_RATIO_W: 0.7066508313539193,
  SHEET_ASPECT_RATIO_H: 1.414285714285714,
  FONT_TO_WIDTH_RATIO: 49.58333333333333,
  FONTS: [
    'Arial',
    'Calibri',
    'Helvetica',
    'Garamond',
    'Times New Roman',
    'Verdana',
    'Cambria',
    'Georgia',
    'Roboto',
    'Open Sans',
    'Lato',
    'Cormorant Garamond',
    'Book Antiqua',
    'Arial Narrow',
    'Cormorant Garamond',
    'Rochester',
    'Sorts Mill Goudy',
  ],

};

export const INITIAL_STYLES: Style = {
  display: 'grid',
  width: '595px',
  height: '842px',
  backgroundColor: 'lightgray',
  color: 'black',
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px',
  padding: '12px',
  borderRadius: '5px',
  transform: 'scale(1)',
}

