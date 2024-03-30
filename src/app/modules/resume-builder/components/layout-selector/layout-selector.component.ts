import { EventBusService } from './../../../event-bus/event-bus.service';
import { layoutConstants } from 'src/app/constants/layoutConstants';
import { JSEventBusService } from './../../../event-bus/jsevent-bus.service';
import { UtilService } from './../../../utils/util.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { JSEvent } from 'src/app/modules/event-bus/types';
import { Bin, GridData, SliderControl, TemplateGridStyle, layoutData } from '../../types';
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
  @ViewChild('customSection') customSection!: ElementRef;
  @ViewChildren('slider') sliders!: QueryList<ElementRef>;
  constructor(
    private utilService: UtilService,
    private jsEventBusService: JSEventBusService,
    private eventBusService: EventBusService,
    private renderer: Renderer2
  ) {}
  private bins!: Bin;
  private activeSection: HTMLElement | null = null;
  public sectionControlDisabled = true;
  private draggedElement: EventTarget | null = null;
  private onDragChildOverlapEl: EventTarget | null = null;
  private eventUtil = this.utilService.eventUtil;
  public stringUtil = this.utilService.stringUtil;
  private resumeUtil = this.utilService.resumeBuilderUtil;
  private domUtil = this.utilService.domUtil;
  private eventId = 'LayoutSelectorComponent';
  private jsEventUnsubscribeArr: (() => void)[] = [];
  private timerInterval: number | null = null;
  private isAppendAllowed = false;
  private gridData: GridData = {}
  public generalSections = [...layoutConstants.generalSections];
  public deleteOn = false;
  public inDeleteMode = false;
  public object = Object;
  public sliderValues: SliderControl = {
    gridRowStart: 0,
    gridRowEnd: 0,
    gridColumnStart: 0,
    gridColumnEnd: 0,
  };
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
      this.dragEndTransmit.bind(this),
      { target: `.resume-section-draggable` }
    );

    const unsubscribe4 = this.jsEventBusService.subscribe(
      this.eventId,
      'click',
      this.activateAdvanceControls.bind(this)
    );

    this.jsEventUnsubscribeArr.push(
      unsubscribe1,
      unsubscribe2,
      unsubscribe3,
      unsubscribe4
    );
  }

  dragStart(e: JSEvent) {
    this.renderer.addClass(e.target, 'dragging');
    this.draggedElement = e.target ? e.target : null;
  }

  dragOver(e: JSEvent) {
    e.preventDefault();
    const eTarget = e.target as HTMLElement;
    const parentName = Object.keys(this.bins).find(
      (bin) =>
        this.bins[bin].element === eTarget ||
        this.bins[bin].element === eTarget.parentElement
    );
    const parent = this.bins[parentName as string].element;
    const hoverOnSheet = parent === this.sheetArea.nativeElement;

    if (!parent) return;

    if (!this.timerInterval) {
      this.timerInterval = window.setInterval(() => {
        this.isAppendAllowed = true;
      }, 80);
    }

    if (this.isAppendAllowed) {
      this.onDragChildOverlapEl =
        eTarget === parent || eTarget === this.draggedElement ? null : eTarget;
      const isDraggedAppended = this.domUtil.hasChild(
        parent,
        this.draggedElement as HTMLElement
      );
      if (eTarget === this.draggedElement && isDraggedAppended) return;

      if (
        this.onDragChildOverlapEl &&
        hoverOnSheet &&
        this.dragIsBelowCenter(e)
      ) {
        this.renderer.insertBefore(parent, this.draggedElement, eTarget);
      } else if (this.onDragChildOverlapEl && !hoverOnSheet) {
      } else {
        this.renderer.appendChild(parent, this.draggedElement);
      }
      if (hoverOnSheet) {
        this.bins['sheet'].classes.forEach((className) => {
          this.renderer.addClass(this.draggedElement, className);
        });
        this.bins['storage'].classes.forEach((className) => {
          this.renderer.removeClass(this.draggedElement, className);
        });
      } else {
        this.bins['storage'].classes.forEach((className) => {
          this.renderer.addClass(this.draggedElement, className);
        });
        this.bins['sheet'].classes.forEach((className) => {
          this.renderer.removeClass(this.draggedElement, className);
        });
      }
    }
    this.isAppendAllowed = false;
  }

  dragIsBelowCenter(e: JSEvent) {
    const { height } = (
      this.onDragChildOverlapEl as HTMLElement
    ).getBoundingClientRect();
    const { offsetX, offsetY } = this.eventUtil.eventData(e);
    return offsetY > height / 2;
  }
  activateAdvanceControls(e: JSEvent) {
    const target = e.target as HTMLElement;
    const parents = this.domUtil.getParents(target, 10);
    const sections = Array.from(
      document.querySelectorAll('.resume-section-draggable.on-sheet')
    );
    // If teh click is not relted to a section
    if (
      !this.sectionControlDisabled &&
      this.activeSection &&
      !parents.includes(this.customSection.nativeElement) &&
      !sections.includes(target)
    ) {
      this.sectionControlDisabled = true;
      this.activeSection = null;
      Object.keys(this.sliderValues).forEach((sliderName) => {
        this.sliderValues[sliderName] = 0;
      });
      // If the click is related to a section and prevois controls a disabled
    } else {
      const currentSection = this.generalSections.find(
        (section) => section.title === target.dataset['id']
      );
      const sectionStyles = currentSection?.styles;
      if (
        this.sectionControlDisabled &&
        !this.activeSection &&
        sections.includes(target)
      ) {
        Object.keys(this.sliderValues).forEach((sliderName) => {
          this.sliderValues[sliderName] = Number(sectionStyles?.[sliderName]);
        });
        this.sectionControlDisabled = false;
        this.activeSection = target;
      } else if (
        !this.sectionControlDisabled &&
        this.activeSection &&
        sections.includes(target) &&
        this.activeSection !== target
      ) {
        const currentSection = this.generalSections.find(
          (section) => section.title === target.dataset['id']
        );
        const sectionStyles = currentSection?.styles;
        Object.keys(this.sliderValues).forEach((sliderName) => {
          this.sliderValues[sliderName] = Number(sectionStyles?.[sliderName]);
        });
        this.sectionControlDisabled = false;
        this.activeSection = target;
      }
    }
  }

  gridPosition() {
    if (this.activeSection) {
      const sectionConfig = this.generalSections.find(
        (section) => section.title === this.activeSection?.dataset['id']
      );
      Object.keys(this.sliderValues).forEach((styleProp) => {
        if (this.sliderValues[styleProp]) {
          this.renderer.setStyle(
            this.activeSection,
            `${styleProp}`,
            `${this.sliderValues[styleProp]}`
          );
          if (sectionConfig?.styles[styleProp]) {
            sectionConfig.styles[styleProp] = `${this.sliderValues[styleProp]}`;
          }
        }
      });
    }
  }

  dragEndTransmit(e: JSEvent) {
    this.renderer.removeClass(e.target, 'dragging');
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (!this.onDragChildOverlapEl) {
      this.harvestLayoutData();
      this.eventBusService.emit({
        event: 'TemplateModalContentOutput',
        data: this.gridData,
      });

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
        (child) => child === this.onDragChildOverlapEl
      );
      if (draggableIndex !== swappableIndex) {
        children.forEach((child) => child.remove());
        children.splice(
          draggableIndex,
          1,
          this.onDragChildOverlapEl as HTMLElement
        );
        children.splice(swappableIndex, 1, e.target as HTMLElement);
        const fragment = document.createDocumentFragment();
        children.forEach((child) => fragment.appendChild(child));
        this.renderer.appendChild(parent, fragment);
      }
    }
    this.harvestLayoutData();
      this.eventBusService.emit({
        event: 'TemplateModalContentOutput',
        data: this.gridData,
      });
  }

  harvestLayoutData() {
    const gridData = this.domUtil.getGridRelativeStyles(
      this.bins['sheet'].element
    );
    const gridChildren = Array.from(this.bins['sheet'].element.children);
    const childData: layoutData[] = [];
    gridChildren.forEach((child) => {
      const styles = this.domUtil.getGridChildStyles(child);
      const { id: name } = (child as HTMLElement).dataset;
      const templateData = this.generalSections.find(
        (section) => section.title.toLowerCase() === name?.toLowerCase()
      );
      childData.push({
        ...templateData,
        styles,
      });
    });
    this.gridData = {
      ...gridData,
      childData,
    };
  }

  ngAfterViewInit(): void {
    this.setSheetDimensions();
    this.bins = {
      storage: {
        element: this.sectionsArea.nativeElement as HTMLElement,
        classes: ['in-general-section'],
      },
      sheet: {
        element: this.sheetArea.nativeElement as HTMLElement,
        classes: ['on-sheet', 'resizeable'],
      },
    };
  }

  ngOnDestroy(): void {
    this.jsEventUnsubscribeArr.forEach((unsubscribe) => unsubscribe());
  }

  addSection(form: NgForm) {
    if (this.generalSections.length > 15) {
      throw new Error('Cannot have more than 15 sections on the pool!');
    }
    let { name } = form.value;
    const alreadyExists = this.generalSections.find(
      (section) => section.title.toLowerCase() === name.toLowerCase()
    );
    if (alreadyExists) {
      throw new Error('Section alredy exists!');
    }

    if (!name) name = this.stringUtil.format(name);
    name = this.stringUtil.toPascalCase(name);
    this.generalSections.push({
      title: name as string,
      styles: {
        gridRowStart: '0',
        gridRowEnd: '0',
        gridColumnStart: '0',
        gridColumnEnd: '0',
      },
    });
    form.reset();
  }

  deleteMode(e: Event) {
    const target = e.target as HTMLInputElement;
    const deleteMode = target.checked;
    const customSections = this.generalSections.filter(
      (section) => !layoutConstants.generalSections.includes(section)
    );
    if (!customSections.length) {
      target.checked = false;
      return;
    }

    if (deleteMode) {
      customSections.forEach((section) => {
        const sectionElement = document.querySelector(
          `[data-id="${section.title}"]`
        );
        const hasButton = sectionElement?.querySelector('.section-delete-btn');
        if (sectionElement && !hasButton) {
          const deleteBtn = this.renderer.createElement('A');
          this.renderer.setProperty(deleteBtn, 'textContent', 'x');
          this.renderer.addClass(deleteBtn, 'section-delete-btn');
          this.renderer.listen(deleteBtn, 'click', () =>
            this.removeSection(sectionElement, section.title)
          );
          this.renderer.appendChild(sectionElement, deleteBtn);
        }
      });
    } else {
      customSections.forEach((section) => {
        const parent = document.querySelector(`[data-id="${section.title}"]`);
        const button = parent?.querySelector('.section-delete-btn');
        this.renderer.removeChild(parent, button);
      });
    }
  }

  removeSection(parent: Element, title: string) {
    parent.remove();
    const index = this.generalSections.findIndex((obj) => obj.title === title);
    this.generalSections.splice(index, 1);
    const customSections = this.generalSections.filter(
      (section) => !layoutConstants.generalSections.includes(section)
    );
    if (!customSections.length) {
      this.inDeleteMode = false;
    }
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
