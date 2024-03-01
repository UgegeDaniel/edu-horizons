import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedAssignmentsComponent } from 'src/pages/assignment/assigned-assignments/assigned-assignments.component';
import { AssignmentSubmissionsComponent } from 'src/pages/assignment/assignment-submissions/assignment-submissions.component';
import { PracticeTestsComponent } from 'src/pages/assignment/practice-tests/practice-tests.component';
import { TestResultsComponent } from 'src/pages/assignment/test-results/test-results.component';
import { ClassesComponent } from 'src/pages/classes/classes.component';
import { HomepageComponent } from 'src/pages/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'assignments/practice-tests', component: PracticeTestsComponent },
  { path: 'assignments/assigned-assignments', component: AssignedAssignmentsComponent },
  { path: 'assignments/test-results', component: TestResultsComponent },
  { path: 'assignments/assignment-submissions', component: AssignmentSubmissionsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
