import { resumeConstants } from '../../constants/resume-constants';
import { Style } from '../resume-builder/types';
import StringUtil from './string-util';

export default class ResumeBuilderUtil {
  private resumeConstants = resumeConstants;
  private stringUtil: StringUtil = new StringUtil();
  aspectRatio(sign: string, pageStyles: Style) {
    let widthValue = pageStyles['width'];
    let [widthValueString, unit] = this.getUnitValue(widthValue);
    let width = Number(widthValueString);
    let modifier: { [k: string]: number } = {
      '+': 50,
      '-': -50,
    };
    width += modifier[sign];
    let height = Math.floor(width / this.resumeConstants.SHEET_ASPECT_RATIO);
    return { width, height, unit };
  }

  fontRatio(width: number) {
    const { FONT_TO_WIDTH_RATIO } = this.resumeConstants;
    return Math.floor(width / FONT_TO_WIDTH_RATIO);
  }

  getUnitValue(size: string) {
    let valueString = this.stringUtil.filterString(size, [
      {
        symbol: '\\d',
      },
    ]);
    let unit = this.stringUtil.filterString(size, [
      {
        symbol: '\\d',
        remove: true,
      },
    ]);
    return [valueString, unit];
  }
}
