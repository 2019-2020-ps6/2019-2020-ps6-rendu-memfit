import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './index/menu/menu.component';
import { IndexComponent } from './index/index.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { CreateQuizComponent } from './quizzes/create-quiz/create-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    MenuComponent,
    IndexComponent,
<<<<<<< HEAD
    PatientListComponent
=======
    CreateQuizComponent
>>>>>>> 54eaeca6b13cfb3c3ae99ee1c5ec8b19a3ff8390
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
