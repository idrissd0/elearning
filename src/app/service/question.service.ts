import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private serverUrl = 'http://localhost:3000/ques';

  constructor(private http : HttpClient) { }

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }

  getQuestions() {
    return this.http.get<any>(this.serverUrl);
  }
}
