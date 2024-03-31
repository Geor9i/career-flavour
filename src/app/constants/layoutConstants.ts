import { TemplateGridStyle } from '../modules/resume-builder/types';

const initialStyles: TemplateGridStyle = {
  gridRowStart: '0',
  gridRowEnd: '0',
  gridColumnStart: '0',
  gridColumnEnd: '0',
};

const header = {
  type: 'Header',
  name: 'Test name',
  position: 'Applying for...',
  summary: 'Something about me...',
  contentPlacement: 'list',
  contentFlow: 'vertical',
  styles: { ...initialStyles },
};
const education = {
  type: 'Education',
  title: 'Education',
  contentPlacement: 'chronological',
  contentFlow: 'vertical',
  styles: { ...initialStyles },
};
const workExperience = {
  type: 'Work Experience',
  title: 'Work Experience',
  contentPlacement: 'chronological',
  contentFlow: 'horizontal',
  styles: { ...initialStyles },
};
const skills = {
  type: 'Skills',
  title: 'Skills',
  contentPlacement: 'list',
  contentFlow: 'vertical',
  styles: { ...initialStyles },
};
const softSkills = {
  type: 'Soft Skills',
  title: 'Soft Skills',
  contentPlacement: 'list',
  contentFlow: 'horizontal',
  styles: { ...initialStyles },
};

export const layoutConstants = {
  generalSections: [
    header,
    education,
    workExperience,
    skills,
    softSkills,
    { type: 'Contacts', styles: { ...initialStyles } },
    { type: 'Projects', styles: { ...initialStyles } },
    { type: 'Hobbies', styles: { ...initialStyles } },
    { type: 'Certificates', styles: { ...initialStyles } },
  ],
};
