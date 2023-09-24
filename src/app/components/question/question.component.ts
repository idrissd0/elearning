import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  public username! : string;
  public questionList : any = [];
  public currentQuestion : number = 1;
  public points : number = 0;
  counter = 60;
  correctQuestion : number = 0;
  incorrectQuestion : number = 0;
  interval$ : any;
  progress : string = '0';


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')!;
    this.getAllQuestions();
    this.startCounter();
  };

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        console.log(res.questions)
        this.questionList = res.questions;
      })
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
    if (option.correct) {
      this.points += 10;
      this.correctQuestion++;
      // this.currentQuestion++;
      // this.getProgressPercentage();

    } else {
      this.points -= 2;
      this.incorrectQuestion++;
      // this.currentQuestion++;
      // this.getProgressPercentage();
    }

    this.currentQuestion = toNextQuestion+1;
    this.resetCounter();
    this.getProgressPercentage();
  };

  startCounter(){
    this.interval$ = interval(1000).subscribe(val=>{
      this.counter--; //each 1sec the counter will mines by 1.
      if(this.counter == 0 ){ //once the counter equals to 0
        this.currentQuestion++; // -pass to the next question
        this.counter=60; // -reset the counter to 60sec
        this.points-=2; // -take the answer as wrong;
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
