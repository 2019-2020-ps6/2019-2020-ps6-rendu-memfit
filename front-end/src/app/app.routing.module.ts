import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { IndexComponent } from './index/index.component';
import { CreateQuizComponent } from './quizzes/create-quiz/create-quiz.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { QuizShowComponent } from './quizzes/quiz-show/quiz-show.component';
import { ReplayquizComponent } from './patients/replayquiz/replayquiz.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'quiz/', component: QuizListComponent},
    {path: 'quiz/show/:quizId', component: QuizShowComponent},
    {path: 'quiz/edit/:id', component: EditQuizComponent},
    {path: 'quiz/create', component: CreateQuizComponent},
    {path: 'select-patient', component: PatientListComponent},
    {path: 'select-patient/patients', component: IndexComponent},
    {path: 'patients/:patientId/quizReplay/:quizReplayId', component: ReplayquizComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
