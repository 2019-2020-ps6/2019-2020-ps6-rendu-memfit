import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { HeaderComponent } from './header/header.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { CreateQuizComponent } from './quizzes/create-quiz/create-quiz.component';
import { PatientComponent } from './patients/patient/patient.component';
import { LogoComponent } from './logo/logo.component';
import { QuizShowComponent } from './quizzes/quiz-show/quiz-show.component';
import { AnswersComponent } from './answers/answers.component';
import { ReplayquizComponent } from './patients/replayquiz/replayquiz.component';
import { QuizCardComponent } from './quizzes/quiz-selection/quiz-card/quiz-card.component';
import { QuizSelectorComponent } from './quizzes/quiz-selection/quiz-selector/quiz-selector.component';
import { ManageComponent } from './patients/manage/manage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    QuizFormComponent,
    HeaderComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    IndexComponent,
    PatientListComponent,
    CreateQuizComponent,
    PatientComponent,
    CreateQuizComponent,
    IndexComponent,
    LogoComponent,

    QuizShowComponent,

    AnswersComponent,

    ReplayquizComponent,

    QuizCardComponent,

    QuizSelectorComponent,

    ManageComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
