import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { QuestionService } from '../../service/question.service';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';

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
    this.startCounter();

    /* -----
    this.http.get('http://localhost:3000/questions').subscribe((data: any) => {
      console.log(data);
      console.log(data.length);
      const que = JSON.stringify(this.transformedData(data), null, 2);
      // console.log(que);
      const questions = {'questions': JSON.parse(que)}
      console.log(questions)
      this.questionList = questions;
    });
    */
  };

  /* -----
  transformedData(data: any): Question[] {
    return data.map((inputQuestion: any) => {
      const optionIds = inputQuestion.option_ids.split(',').map(Number);
      const optionTexts = inputQuestion.option_texts.split(',');
      const optionCorrectness = inputQuestion.option_correct.split(',').map(Number);

      const options = optionTexts.map((text: string, index: number) => {
        const option: any = { text: text };
        if (optionCorrectness[index] === 1) {
          option.correct = true;
        }
        return option;
      });

      return {
        questionText: inputQuestion.questionText,
        options: options,
        explanation: inputQuestion.explanation
      } as Question;
    });
  }
  */
  getAllQuestions() {
    this.questionService.getQuestions()
      .subscribe(
        (res: any) => {
          console.log(res.questions);
          this.questionList = res.questions;
          console.log(this.questionList);
        }
      );
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
