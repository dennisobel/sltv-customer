import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[hideheader]', // Attribute selector
  host: {
  	"(ionScroll)":"onContentScroll($event)"
  }
})
export class HideHeaderDirective {

@Input("header") header: HTMLElement;
headerHeight;
scrollContent;

  constructor(public element:ElementRef, public renderer: Renderer) {
    console.log('Hello HideHeaderDirective Directive');
  }

  ngOnInit(){
  	this.headerHeight = this.header.clientHeight;
  	this.renderer.setElementStyle(this.header, "webkitTransition", "top 700ms");
  	this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
  	this.renderer.setElementStyle(this.scrollContent, "webkitTransition", "margin-top 700ms");
  }

  onContentScroll(event){
  	if(event.scrollTop > this.headerHeight){
  		this.renderer.setElementStyle(this.header, "top","-70px")
  		this.renderer.setElementStyle(this.scrollContent, "margin-top","0px")
  	}else{
  		this.renderer.setElementStyle(this.header, "top","0px")
  		this.renderer.setElementStyle(this.scrollContent, "margin-top","80px")
  	}
  }

}
