import { v4 as uuidv4  } from 'uuid';

import {
  AfterViewInit,
  Component,
  ElementRef,
  NgIterable,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { JSEventBusService } from 'src/app/modules/event-bus/jsevent-bus.service';
import { JSEvent } from 'src/app/modules/event-bus/types';
import { FireService } from 'src/app/modules/fire/fire-service';
import { UtilService } from 'src/app/modules/utils/util.service';
import { Router } from '@angular/router';
import { RESUME_DB, dbs } from 'src/app/constants/dbConstants';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-templates',
  templateUrl: './my-templates.component.html',
  styleUrls: ['./my-templates.component.css'],
})
export class MyTemplatesComponent implements OnInit, AfterViewInit, OnDestroy {
  public templates: NgIterable<any> = [];
  public link: string = '';
  public templateStyles: { [key: string]: string }[] = [];
  private jSEventSubId = 'MyTemplatesComponent';
  private jsEventUnsubscribeArr: (() => void)[] = [];
  private fireServiceSubscription!: Subscription;
  private resumeRoute = '/resume-editor';
  constructor(
    private jSEventBusService: JSEventBusService,
    private utilService: UtilService,
    private fireService: FireService,
    private router: Router
  ) {}
  private objectutil = this.utilService.objectUtil;
  @ViewChildren('template') template!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.fireServiceSubscription = this.fireService.userData.subscribe(
      (data) => {
        if (data && data[RESUME_DB.RESUMES]) {
          const resumes = data[RESUME_DB.RESUMES]
          this.templates = this.objectutil.reduceToArr(resumes)
          console.log(this.templates);
        }
      }
    );
  }

  ngAfterViewInit(): void {
    const unsubscribe = this.jSEventBusService.subscribe(
      this.jSEventSubId,
      'mousemove',
      this.onMouseMoveTemplate.bind(this),
      { target: '.template' }
    );

    const unsubscribe2 = this.jSEventBusService.subscribe(
      this.jSEventSubId,
      'mouseout',
      this.resetTemplateStyles.bind(this),
      { target: '.template' }
    );

    this.jsEventUnsubscribeArr.push(unsubscribe, unsubscribe2);
  }

  ngOnDestroy(): void {
    this.jsEventUnsubscribeArr.forEach((unsubscribe) => unsubscribe());
    this.fireServiceSubscription.unsubscribe();
  }
  onMouseMoveTemplate(event: JSEvent): void {
    const targetIndex = this.template
      .toArray()
      .findIndex((ref) => ref.nativeElement === event.target);
    if (targetIndex !== -1) {
      const { offsetX, offsetY, rect } =
        this.utilService.eventUtil.eventData(event);
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
    const targetIndex = this.template
      .toArray()
      .findIndex((ref) => ref.nativeElement === event.target);
    if (targetIndex !== -1) {
      this.templateStyles[targetIndex] = {
        transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)',
      };
    }
  }

  blankResume() {
  const id = `${Date.now()}${uuidv4()}`;
  this.router.navigateByUrl(`${this.resumeRoute}/${id}`)
  }
}
