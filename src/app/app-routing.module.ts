import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuizWelcomeComponent } from './components/quiz/quiz-welcome.component';
import { QuestionComponent } from './components/quiz/quizQuestions/question.component';
import { LessonsComponent } from './components/lessons/lessons.component';

const routes: Routes = [
  {path:"", redirectTo: 'welcome', pathMatch:"full"},
  {path:"welcome", component: WelcomeComponent},
  {path:"quiz", component: QuizWelcomeComponent},
  {path:"questions", component: QuestionComponent},
  {path:'courses', component: LessonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
