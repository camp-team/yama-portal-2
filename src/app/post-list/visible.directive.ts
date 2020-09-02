import {
  Directive,
  Output,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appVisible]',
})
export class VisibleDirective implements OnDestroy, AfterViewInit {
  @Output() public Visible: EventEmitter<boolean> = new EventEmitter();
  private intersectionObserver?: IntersectionObserver;

  constructor(private element: ElementRef) {}

  public ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(this.element.nativeElement);
  }

  public ngOnDestroy() {
    this.intersectionObserver.disconnect();
  }

  private checkForIntersection = (
    entries: Array<IntersectionObserverEntry>
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const isIntersecting =
        (entry as any).isIntersecting &&
        entry.target === this.element.nativeElement;

      if (isIntersecting) {
        this.Visible.emit(true);
      }
    });
  };
}
