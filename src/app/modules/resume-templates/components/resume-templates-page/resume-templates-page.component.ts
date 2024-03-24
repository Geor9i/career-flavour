import { UtilService } from './../../../utils/util.service';
import { JSEventBusService } from 'src/app/modules/event-bus/jsevent-bus.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { JSEvent } from 'src/app/modules/event-bus/types';

@Component({
  selector: 'app-resume-templates-page',
  templateUrl: './resume-templates-page.component.html',
  styleUrls: ['./resume-templates-page.component.css'],
})
export class ResumeTemplatesPageComponent implements AfterViewInit, OnDestroy {
  private jSEventSubId = 'ResumeTemplatesPageComponent';
  private jsEventUnsubscribeArr: (() => void)[] = [];
  private eventUt = this.utilService.eventUtil;
  constructor(
    private jSEventBusService: JSEventBusService,
    private utilService: UtilService
  ) {}
  public templates = [1,2,3,4, 5];
  public templateStyles: { [key: string]: string } = {};

  @ViewChildren('template') template!: QueryList<ElementRef>;
  ngAfterViewInit(): void {
    const templateElements = this.template
      .toArray()
      .map((el) => el.nativeElement);
    const unsubscribe = this.jSEventBusService.subscribe(
      this.jSEventSubId,
      'mousemove',
      this.onMouseMoveTemplate.bind(this),
      { target: templateElements }
    );

    const unsubscribe2 = this.jSEventBusService.subscribe(
      this.jSEventSubId,
      'mouseout',
      this.resetTemplateStyles.bind(this),
      { target: templateElements }
    );

    this.jsEventUnsubscribeArr.push(unsubscribe);
    console.log(this.eventUt);
  }


  ngOnDestroy(): void {
    this.jsEventUnsubscribeArr.forEach((unsubscribe) => unsubscribe());
  }
  onMouseMoveTemplate(e: JSEvent) {
    const data = this.eventUt.eventData(e);
    const { centerX, centerY, offsetX, offsetY, rect } = data;
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    const tiltFactor = 5; // Adjust the tilt factor as needed

    const distanceToLeft = offsetX;
    const distanceToRight = containerWidth - offsetX;
    const distanceToTop = offsetY;
    const distanceToBottom = containerHeight - offsetY;

    const rotateX = (distanceToBottom - distanceToTop) / containerHeight * tiltFactor;
    const rotateY = (distanceToLeft - distanceToRight) / containerWidth * tiltFactor;

    this.templateStyles = {
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg`
    };
    // console.log({ centerX, centerY, offsetX, offsetY, width: rect.width, height: rect.height });
  }


  resetTemplateStyles() {
      this.templateStyles = {
        transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)'
      };
  }

}
