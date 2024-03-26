import { resumeConstants } from '../../constants/resume-constants';
import { Style } from '../resume-builder/types';
import StringUtil from './string-util';

export default class ResumeBuilderUtil {
  private resumeConstants = resumeConstants;
  private stringUtil: StringUtil = new StringUtil();
  changeAspectRatio(sign: string, pageStyles: Style, measureUnit?: string) {
    let widthValue = pageStyles['width'];
    let [widthValueString, defaultUnit] = this.getUnitValue(widthValue);
    let unit = measureUnit || defaultUnit || 'px';
    let width = Number(widthValueString);
    let modifier: { [k: string]: number } = {
      '+': 50,
      '-': -50,
    };
    width += modifier[sign];
    let height = Math.floor(width / this.resumeConstants.SHEET_ASPECT_RATIO_W);
    return { width, height, unit };
  }

  aspectRatio({width, height}: {width?: number; height?: number;}) {
    const sideA = width ? width : height;
    if (!sideA) throw new Error('Please provide a valid value for either width or height!');
    const aspectRatio = width ? resumeConstants.SHEET_ASPECT_RATIO_H : resumeConstants.SHEET_ASPECT_RATIO_W;
    const sideB = sideA * aspectRatio;
    let [newHeight, newWidth] = sideA > sideB ? [sideA, sideB] : [sideB, sideA];
    return { width: newWidth, height: newHeight};
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
