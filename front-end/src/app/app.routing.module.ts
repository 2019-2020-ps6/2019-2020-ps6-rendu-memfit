import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { IndexComponent } from './index/index.component';
import { CreateQuizComponent } from './quizzes/create-quiz/create-quiz.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { QuizShowComponent } from './quizzes/quiz-show/quiz-show.component';
import { QuizSelectorComponent } from "./quizzes/quiz-selection/quiz-selector/quiz-selector.component";
import { ManageComponent } from "./patients/manage/manage.component";
import {ImageUploaderComponent} from "./image-uploader/image-uploader.component";
import {QuizRecordComponent} from "./quiz-record/quiz-record.component";

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'upload', component: ImageUploaderComponent},
    {path: 'quiz/show/:patientId/:quizId', component: QuizShowComponent},
    {path: 'quiz/edit/:id', component: EditQuizComponent},
    {path: 'quiz/create', component: CreateQuizComponent},
    {path: 'select-patient-launch', component: PatientListComponent},
    {path: 'select-patient-launch/:patientId', component: QuizSelectorComponent},
    {path: 'select-patient-update', component: PatientListComponent},
    {path: 'select-patient-update/:patientId', component: QuizSelectorComponent},
    {path: 'patients/manage', component: ManageComponent},
    {path: 'quiz-record/:patientId', component: QuizRecordComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
