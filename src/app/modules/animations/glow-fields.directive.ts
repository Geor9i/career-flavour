import { Directive, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgControl } from '@angular/forms';

@Directive({
  selector: '[appGlowFields]',
})
export class GlowFieldsDirective implements OnDestroy {
  private ngControlSubscription;
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {
    if (this.control && this.control.valueChanges) {
      this.ngControlSubscription = this.control.valueChanges.subscribe(() => {
        this.applyField();
      });
    }
  }

  applyField() {
    const wrapperDiv = this.renderer.parentNode(this.elRef.nativeElement);
    const value = this.control.control?.value;
    if (this.control.dirty && value) {
      switch (this.control.invalid) {
        case true:
          this.renderer.addClass(wrapperDiv, 'error-border');
          this.renderer.removeClass(this.elRef.nativeElement, 'pass');
          break;
        case false:
          this.renderer.removeClass(wrapperDiv, 'error-border');
          this.renderer.addClass(this.elRef.nativeElement, 'pass');
          break;
      }
    } else {
      this.renderer.removeClass(wrapperDiv, 'error-border');
      this.renderer.removeClass(this.elRef.nativeElement, 'pass');
    }
  }

  ngOnDestroy(): void {
    if (this.ngControlSubscription) {
      this.ngControlSubscription.unsubscribe();
    }
  }
}
