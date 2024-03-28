import { TemplateGridStyle } from "../modules/resume-builder/types"

const initialStyles: TemplateGridStyle = {
  gridRowStart: '0',
  gridRowEnd: '0',
  gridColumnStart: '0',
  gridColumnEnd: '0',
}

export const layoutConstants = {
  generalSections: [
    {title: 'Header', styles: {...initialStyles}, position: []},
    {title: 'Contacts', styles: {...initialStyles}, position: []},
    {title: 'Education', styles: {...initialStyles}, position: []},
    {title: 'Work Experience', styles: {...initialStyles}, position: []},
    {title: 'Skills', styles: {...initialStyles}, position: []},
    {title: 'Soft Skills', styles: {...initialStyles}, position: []},
    {title: 'Projects', styles: {...initialStyles}, position: []},
    {title: 'Hobbies', styles: {...initialStyles}, position: []},
    {title: 'Certificates', styles: {...initialStyles}, position: []},
  ]
}
