import { FontApplicator, FontConfig } from '../modules/resume-builder/types';

export const FONT_APPLICATORS: FontApplicator = {
  all: { id: 'all', checked: true },
  sectionHeading: { id: 'sectionHeading', checked: false },
  topicHeading: { id: 'topicHeading', checked: false },
  paragraph: { id: 'paragraph', checked: false },
};

export const FONT_SETTINGS: FontConfig = {
  sectionHeading: { fontSize: '18px', fontFamily: 'Calibri' },
  topicHeading: { fontSize: '14px', fontFamily: 'Calibri' },
  paragraph: { fontSize: '12px', fontFamily: 'Calibri' },
};
