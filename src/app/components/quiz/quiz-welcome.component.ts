import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quiz-welcome',
  templateUrl: './quiz-welcome.component.html',
  styleUrls: ['./quiz-welcome.component.scss']
})
export class QuizWelcomeComponent {
  @ViewChild('username') nameKey! : ElementRef;

  constructor() { }

  ngOnInit():void {  }


  startQuiz(){
    localStorage.setItem("username", this.nameKey.nativeElement.value);
  }
}
