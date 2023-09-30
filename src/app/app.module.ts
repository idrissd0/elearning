import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionComponent } from './components/question/quizQuestions/question.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ChangeBgDirective} from './directives/change-bg.directive';
import { QuizWelcomeComponent } from './components/question/quiz-welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuestionComponent,
    HeaderComponent,
    ChangeBgDirective,
    QuizWelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
