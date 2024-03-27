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
import { Bin } from '../../types';
@Component({
  selector: 'app-layout-selector',
  templateUrl: './layout-selector.component.html',
  styleUrls: ['./layout-selector.component.css'],
})
export class LayoutSelectorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('sheetWrapper') sheetWrapper!: ElementRef;
  @ViewChild('sheet') sheetArea!: ElementRef;
  @ViewChild('sectionsArea') sectionsArea!: ElementRef;
  constructor(
    private utilService: UtilService,
    private jsEventBusService: JSEventBusService,
    private renderer: Renderer2
  ) {}
  private bins: Bin = [];
  private draggedElement!: EventTarget;
  private draggableSwapElement: EventTarget | null = null;
  private eventUtil = this.utilService.eventUtil;
  private stringUtil = this.utilService.stringUtil;
  private resumeUtil = this.utilService.resumeBuilderUtil;
  private eventId = 'LayoutSelectorComponent';
  private jsEventUnsubscribeArr: (() => void)[] = [];
  private timerInterval: number | null = null;
  private isAppendAllowed = false;
  private customSectionsForDelete = [];
  public generalSections = [...layoutConstants.generalSections];
  public headerCheckBoxes = ['Title', 'Summary', 'Image'];
  public deleteOn = false;
  private matrix = [[]];
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
    const eTarget = e.target as HTMLElement;
    if (!this.timerInterval) {
      this.timerInterval = window.setInterval(() => {
        this.isAppendAllowed = true;
      }, 80);
    }
    if (this.isAppendAllowed) {
      let parentBin = eTarget.parentElement;
      // If you are directly inside a bin area
      if (this.bins.some((obj) => obj.element === eTarget)) {
        parentBin = eTarget;
        this.renderer.appendChild(eTarget, this.draggedElement);
        this.draggableSwapElement = null;
        // If you are on top of an element contained in a bin
      } else if (this.bins.some((obj) => obj.element === parentBin)) {
        this.renderer.insertBefore(parentBin, this.draggedElement, eTarget);
        this.draggableSwapElement = eTarget;
      }
      let parentBinIndex = this.bins.findIndex(
        (bin) => bin.element === parentBin
      );
      this.bins[parentBinIndex].classes.forEach((classStr) =>
        this.renderer.addClass(this.draggedElement, classStr)
      );
      this.bins[this.bins.length - 1 - parentBinIndex].classes.forEach(
        (classStr) => this.renderer.removeClass(this.draggedElement, classStr)
      );
      if (parentBin === this.sheetArea.nativeElement) {
        const className = this.getSheetAreaClass(e);
      }
      this.isAppendAllowed = false;
    }
  }

  getSheetAreaClass(e: JSEvent) {
    const { width, height, top, left } =
      this.sheetArea.nativeElement.getBoundingClientRect();
    // console.log({width, height, top, left});

    const { clientX, clientY, offsetX, offsetY } = this.eventUtil.eventData(e);
    // console.log({clientX, clientY});
    // console.log({ offsetX, offsetY });
  }

  dragEnd(e: JSEvent) {
    this.renderer.removeClass(e.target, 'dragging');
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (!this.draggableSwapElement) {
      return;
    }
    const parent = (e.target as HTMLElement).parentElement;

    if (parent?.children) {
      if (parent === this.sectionsArea.nativeElement) {
        this.renderer.removeClass(e.target, 'on-sheet');
      } else {
        this.renderer.removeClass(e.target, 'in-general-section');
      }
      const children = Array.from(parent?.children);
      let draggableIndex = children.findIndex((child) => child === e.target);
      let swappableIndex = children.findIndex(
        (child) => child === this.draggableSwapElement
      );
      console.log({ draggableIndex, swappableIndex });
      if (draggableIndex !== swappableIndex) {
        children.forEach((child) => child.remove());
        children.splice(
          draggableIndex,
          1,
          this.draggableSwapElement as HTMLElement
        );
        children.splice(swappableIndex, 1, e.target as HTMLElement);
        const fragment = document.createDocumentFragment();
        children.forEach((child) => fragment.appendChild(child));
        this.renderer.appendChild(parent, fragment);
      }
    }
  }

  ngAfterViewInit(): void {
    this.setSheetDimensions();
    this.bins = [
      {
        element: this.sectionsArea.nativeElement as HTMLElement,
        classes: ['in-general-section'],
      },
      {
        element: this.sheetArea.nativeElement as HTMLElement,
        classes: ['on-sheet', 'resizeable'],
      },
    ];
  }

  ngOnDestroy(): void {
    this.jsEventUnsubscribeArr.forEach((unsubscribe) => unsubscribe());
  }

  addSection(form: NgForm) {
    let { name } = form.value;
    if (!name) name = this.stringUtil.format(name);
    name = this.stringUtil.toPascalCase(name);
    this.generalSections.push({
      title: name as string,
      styles: {
        'grid-column-start': '1',
        'grid-column-end': '1',
        'grid-row-start': '1',
        'grid-row-end': '1',
      },
      position: [],
    });
    form.reset();
  }

  deleteMode(e: Event) {
    const deleteMode = (e.target as HTMLInputElement).checked;
    const customSections = this.generalSections.filter(
      (section) => !layoutConstants.generalSections.includes(section)
    );
    if (!customSections.length) return;

    if (deleteMode) {
      customSections.forEach((section) => {
        const parent = document.querySelector(`[data-id="${section.title}"]`);
        if (parent) {
          const deleteBtn = this.renderer.createElement('A');
          this.renderer.setProperty(deleteBtn, 'textContent', 'x');
          this.renderer.addClass(deleteBtn, 'section-delete-btn');
          this.renderer.listen(deleteBtn, 'click', () =>
            this.removeSection(parent, section.title)
          );
          this.renderer.appendChild(parent, deleteBtn);
        }
      });
    } else {
      customSections.forEach(section => {
        const parent = document.querySelector(`[data-id="${section.title}"]`);
        const button = parent?.querySelector('.section-delete-btn');
        this.renderer.removeChild(parent, button);
      })
    }
  }

  removeSection(parent: Element, title: string) {
    parent.remove();
    const index = this.generalSections.findIndex((obj) => obj.title === title);
    this.generalSections.splice(index, 1);
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
