import { FireService } from 'src/app/modules/fire/fire-service';
import { UtilService } from './../../../utils/util.service';
import { JSEventBusService } from 'src/app/modules/event-bus/jsevent-bus.service';
import { AfterViewInit,Component, ElementRef,OnDestroy, QueryList, ViewChildren,} from '@angular/core';
import { JSEvent } from 'src/app/modules/event-bus/types';

@Component({
  selector: 'app-resume-templates-page',
  templateUrl: './resume-templates-page.component.html',
  styleUrls: ['./resume-templates-page.component.css'],
})
export class ResumeTemplatesPageComponent implements AfterViewInit, OnDestroy {
  public templates: any = Array(2).fill(0);
  public link: string = ''
  public templateStyles: { [key: string]: string }[] = [];

  private jSEventSubId = 'ResumeTemplatesPageComponent';
  private jsEventUnsubscribeArr: (() => void)[] = [];
  private eventUt = this.utilService.eventUtil;
  constructor(
    private jSEventBusService: JSEventBusService,
    private utilService: UtilService,
    private fireService: FireService
  ) {}

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

    this.jsEventUnsubscribeArr.push(unsubscribe, unsubscribe2);
  }

  ngOnDestroy(): void {
    this.jsEventUnsubscribeArr.forEach((unsubscribe) => unsubscribe());
  }
  onMouseMoveTemplate(event: JSEvent): void {
    const targetIndex = this.template.toArray().findIndex((ref) => ref.nativeElement === event.target);

    if (targetIndex !== -1) {
      const { offsetX, offsetY, rect } = this.utilService.eventUtil.eventData(event);
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      const tiltFactor = 10; // Adjust the tilt factor as needed

      const distanceToLeft = offsetX;
      const distanceToRight = containerWidth - offsetX;
      const distanceToTop = offsetY;
      const distanceToBottom = containerHeight - offsetY;

      const rotateX =
        ((distanceToBottom - distanceToTop) / containerHeight) * tiltFactor;
      const rotateY =
        ((distanceToLeft - distanceToRight) / containerWidth) * tiltFactor;
      this.templateStyles[targetIndex] = {
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      };
    }
  }
  resetTemplateStyles(event: JSEvent): void {
    const targetIndex = this.template.toArray().findIndex((ref) => ref.nativeElement === event.target);
    if (targetIndex !== -1) {
      this.templateStyles[targetIndex] = {
        transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)',
      };
    }
  }
}
