import { FontApplicator, FontConfig } from '../modules/resume-builder/types';

export const FONT_APPLICATORS: FontApplicator = {
  all: { id: 'all', checked: true },
  sectionHeading: { id: 'sectionHeading', checked: false },
  topicHeading: { id: 'topicHeading', checked: false },
  paragraph: { id: 'paragraph', checked: false },
};

export const FONT_SETTINGS: FontConfig = {
  sectionHeading: { baseSize: '18px', fontSize: '18px', fontFamily: 'Calibri' },
  topicHeading: { baseSize: '14px', fontSize: '14px', fontFamily: 'Calibri' },
  paragraph: { baseSize: '12px', fontSize: '12px', fontFamily: 'Calibri' },
};
