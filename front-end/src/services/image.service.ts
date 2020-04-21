import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizRecord} from "../models/quizrecord.model";
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }


  getImgUrl(uploadedPath: string) {
    return serverUrl+"/"+uploadedPath;
  }

}
