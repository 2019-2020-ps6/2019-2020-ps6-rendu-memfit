import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {fade} from "../animations";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [fade]
})
export class IndexComponent implements AfterViewInit {


  ngAfterViewInit() {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#224656';
  }
}
