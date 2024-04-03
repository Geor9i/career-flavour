import { TemplateGridStyle } from '../modules/resume-builder/types';

function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

const initialStyles: TemplateGridStyle = {
  gridRowStart: '0',
  gridRowEnd: '0',
  gridColumnStart: '0',
  gridColumnEnd: '0',
};

const baseSection = {
  styles: deepCopy(initialStyles),
  contentPlacement: 'list',
  contentFlow: 'vertical',
};

const header = {
  type: 'Header',
  name: 'Test name',
  position: 'Applying for...',
  summary: 'Something about me...',
  ...deepCopy(baseSection),
};
const education = {
  type: 'Education',
  title: 'Education',
  ...deepCopy(baseSection),
  contentPlacement: 'chronological',
};
const workExperience = {
  type: 'Work Experience',
  title: 'Work Experience',
  ...deepCopy(baseSection),
  contentPlacement: 'chronological',
  contentFlow: 'horizontal',
};
const skills = {
  type: 'Skills',
  title: 'Skills',
  ...deepCopy(baseSection),
};
const softSkills = {
  type: 'Soft Skills',
  title: 'Soft Skills',
  ...deepCopy(baseSection),
  contentFlow: 'horizontal',
};

const contacts = { type: 'Contacts', ...deepCopy(baseSection), contentFlow: 'horizontal', email: 'email', phone: 'phone', linkedIn: 'linkedIn', github: 'github' };

export const layoutConstants = {
  generalSections: [
    header,
    education,
    workExperience,
    skills,
    softSkills,
    contacts,
    { type: 'Projects', ...deepCopy(baseSection), },
    { type: 'Hobbies', ...deepCopy(baseSection), },
    { type: 'Certificates', ...deepCopy(baseSection), },
  ],
};
