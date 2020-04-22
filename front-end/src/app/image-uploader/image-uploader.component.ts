import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { serverUrl, httpOptionsBase } from './../../configs/server.config';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  uploadedFiles: Array < File > ;
  inputText: string = "Choisir un fichier";


  @Output() uploaded = new EventEmitter<string>();

  constructor(private http: HttpClient) {

  }


  ngOnInit() {
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.inputText = this.uploadedFiles[0].name;
  }

  upload() {
    let formData = new FormData();

    if(this.uploadedFiles == undefined){
      console.log("Please provide file")
      return;
    }

    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    console.log(formData);

    this.http.post(serverUrl+'/upload', formData)
      .subscribe((response) => {
        console.log('response received is ', response);
        this.uploaded.emit(response["filepath"]);
      })
  }

}
