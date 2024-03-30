import { TemplateGridStyle } from "../modules/resume-builder/types"

const initialStyles: TemplateGridStyle = {
  gridRowStart: '0',
  gridRowEnd: '0',
  gridColumnStart: '0',
  gridColumnEnd: '0',
}

export const layoutConstants = {
  generalSections: [
    {title: 'Header', styles: {...initialStyles}},
    {title: 'Contacts', styles: {...initialStyles}},
    {title: 'Education', styles: {...initialStyles}},
    {title: 'Work Experience', styles: {...initialStyles}},
    {title: 'Skills', styles: {...initialStyles}},
    {title: 'Soft Skills', styles: {...initialStyles}},
    {title: 'Projects', styles: {...initialStyles}},
    {title: 'Hobbies', styles: {...initialStyles}},
    {title: 'Certificates', styles: {...initialStyles}},
  ]
}
