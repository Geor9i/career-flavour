import { layoutConstants } from 'src/app/constants/layoutConstants';
import { JSEventBusService } from './../../../event-bus/jsevent-bus.service';
import { UtilService } from './../../../utils/util.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { JSEvent } from 'src/app/modules/event-bus/types';
@Component({
  selector: 'app-layout-selector',
  templateUrl: './layout-selector.component.html',
  styleUrls: ['./layout-selector.component.css'],
})
export class LayoutSelectorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('sheetWrapper') sheetWrapper!: ElementRef;
  @ViewChild('sheet') sheet!: ElementRef;
  @ViewChild('sectionsArea') sectionsArea!: ElementRef;
  constructor(
    private utilService: UtilService,
    private jsEventBusService: JSEventBusService,
    private renderer: Renderer2
  ) {}
  private draggedElement!: EventTarget;
  private draggableSwapElement: EventTarget | null = null;
  private stringUtil = this.utilService.stringUtil;
  private resumeUtil = this.utilService.resumeBuilderUtil;
  private eventId = 'LayoutSelectorComponent';
  private jsEventUnsubscribeArr: (() => void)[] = [];
  public generalSections = layoutConstants.generalSections;
  sheetStyles = {
    width: '0',
    height: '0',
  };

  ngOnInit(): void {
    const unsubscribe1 = this.jsEventBusService.subscribe(
      this.eventId,
      'dragstart',
      this.dragStart.bind(this),
      {
        target: `.resume-section-draggable`,
      }
    );
    const unsubscribe2 = this.jsEventBusService.subscribe(
      this.eventId,
      'dragover',
      this.dragOver.bind(this),
      { target: [`.sheet-layout.bin`, '.layout-sections-container.bin'] }
    );
    const unsubscribe3 = this.jsEventBusService.subscribe(
      this.eventId,
      'dragend',
      this.dragEnd.bind(this),
      { target: `.resume-section-draggable` }
    );

    this.jsEventUnsubscribeArr.push(unsubscribe1, unsubscribe2, unsubscribe3);
  }

  dragStart(e: JSEvent) {
    this.renderer.addClass(e.target, 'dragging');
    if (e.target) {
      this.draggedElement = e.target;
    }
  }

  dragOver(e: JSEvent) {
    e.preventDefault();
    const bins = [this.sheet.nativeElement, this.sectionsArea.nativeElement];
    console.log(e.target);
    const parent = (e.target as HTMLElement).parentElement;
    if (bins.includes(e.target)) {
      this.renderer.appendChild(e.target, this.draggedElement);
      this.draggableSwapElement = null;
    } else if (bins.includes(parent)) {
      this.renderer.insertBefore(parent, this.draggedElement, e.target)
      this.draggableSwapElement = e.target;
    }
  }

  dragEnd(e: JSEvent) {
    this.renderer.removeClass(e.target, 'dragging');
    const bins = [this.sheet.nativeElement, this.sectionsArea.nativeElement];
    console.log(e.target);

    if (!this.draggableSwapElement) {
      return
    }
    const parent = (e.target as HTMLElement).parentElement;
    if (parent?.children) {
     const children = Array.from(parent?.children);
     let draggableIndex = children.findIndex(child => child === e.target);
     let swappableIndex = children.findIndex(child => child === this.draggableSwapElement);
     console.log({draggableIndex, swappableIndex});
     if (draggableIndex !== swappableIndex) {
       children.forEach(child => child.remove())
       children.splice(draggableIndex, 1, (this.draggableSwapElement as HTMLElement));
       children.splice(swappableIndex, 1, (e.target as HTMLElement));
        const fragment = document.createDocumentFragment();
        children.forEach(child => fragment.appendChild(child));
        parent.appendChild(fragment);
     }


    }




  }

  ngAfterViewInit(): void {
    this.setSheetDimensions();
  }

  ngOnDestroy(): void {
    this.jsEventUnsubscribeArr.forEach((unsubscribe) => unsubscribe());
  }

  addSection(form: NgForm) {
    let { name } = form.value;
    if (!name) name = this.stringUtil.format(name);
    name = this.stringUtil.toPascalCase(name);
    this.generalSections.push(name);
    form.reset();
  }

  setSheetDimensions() {
    const { height: wrapperHeight } =
      this.sheetWrapper.nativeElement.getBoundingClientRect();
    let adjustdheight = wrapperHeight * 0.8;
    const { width, height } = this.resumeUtil.aspectRatio({
      height: adjustdheight,
    });
    this.sheetStyles = {
      ...this.sheetStyles,
      width: width + 'px',
      height: height + 'px',
    };
  }
}
