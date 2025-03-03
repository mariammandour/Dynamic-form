import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appSeeMoreLess]'
})
export class SeeMoreLessDirective implements OnInit {
  @Input() fullText: string = '';
  private isCollapsed: boolean = true;
  private seeMoreText: string = 'See More';
  private seeLessText: string = 'See Less';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.updateText();
  }

  @HostListener('click') onClick() {
    this.isCollapsed = !this.isCollapsed;
    this.updateText();
  }

  private updateText() {
    if (this.fullText.length > 100) {
      const textToShow = this.isCollapsed ? this.fullText.substring(0, 50) + '...' : this.fullText;
      const toggleText = this.isCollapsed ? this.seeMoreText : this.seeLessText;
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', `${textToShow} <a href="javascript:void(0)" class="see-more-less-link">${toggleText}</a>`);
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', `${this.fullText}`);
    }
  }
}