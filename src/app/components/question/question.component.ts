import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit{
  public username!: string;
  public questionList: any = [];
  public currentQuestion:number = 1;
  public points: number = 0;
  counter=60;


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')!;
    this.getAllQuestions()
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        console.log(res.questions)
        this.questionList = res.questions;
      })
  }

  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  resetQuiz(){

  }
  answer(toNextQuestion:number, option:any){
    if (option.correct) {
      this.points += 10;
    } else {
      this.points -= 2;
    }

    this.currentQuestion = toNextQuestion+1;
  }

}
