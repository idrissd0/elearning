import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { QuestionService } from '../../../service/question.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  public username! : string;
  public questionList : any = [];
  public currentQuestion : number = 0;
  public points : number = 0;
  counter = 60;
  correctAnswer : number = 0;
  inCorrectAnswer : number = 0;
  interval$ : any;
  progress : string = '0';
  isQuizCompleted : boolean = false;

  constructor(private questionService: QuestionService, private http : HttpClient) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')!;
    this.getAllQuestions();
  };

  async getAllQuestions() {
    await this.questionService.getQuestions()
      .subscribe(
        (res: any) => {
          this.questionList = res.questions;
          console.log(this.questionList);
        }
      );
    this.startCounter();
  };

  nextQuestion(){
    this.currentQuestion++;
    this.resetCounter();
    this.getProgressPercentage();
  };
  previousQuestion() {
    this.currentQuestion--;
    this.getProgressPercentage();
  };

  answer(toNextQuestion:number, option:any){
    if(toNextQuestion === this.questionList.length){
      setTimeout(() => {
        this.isQuizCompleted = true;
        this.stopCounter();
      }, 500);
    }

    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
    } else {
      this.points -= 2;
      this.inCorrectAnswer++;
    }
    setTimeout(() => {
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercentage();
    }, 500);
  };

  startCounter(){
    this.interval$ = interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter == 0 ){
        this.currentQuestion++;
        this.counter=60;
        this.points-=2;
      }
    });
    setInterval(() => {
      this.interval$.unsubscribe();
    }, 600000);
  };
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;
  };
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  };

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.getProgressPercentage();
  };

  getProgressPercentage(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  };

}


/*
RXJS
var$ OBSARVABLE

*/
