import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef){

  }
  ngAfterViewInit(){
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#224656';
  }

}
