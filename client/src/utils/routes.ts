import { Routes } from "@angular/router";
import { AnalyticsComponent } from "src/pages/admin/analytics/analytics.component";
import { ContentManagementComponent } from "src/pages/admin/content-management/content-management.component";
import { DashboardComponent } from "src/pages/admin/dashboard/dashboard.component";
import { SettingsComponent } from "src/pages/admin/settings/settings.component";
import { UserManagementComponent } from "src/pages/admin/user-management/user-management.component";
import { AssignedAssignmentsComponent } from "src/pages/assignment/assigned-assignments/assigned-assignments.component";
import { PracticeTestsComponent } from "src/pages/assignment/practice-tests/practice-tests.component";
import { TestResultsComponent } from "src/pages/assignment/test-results/test-results.component";
import { ClassesComponent } from "src/pages/classes/classes.component";
import { DiscussionForumsComponent } from "src/pages/community/discussion-forums/discussion-forums.component";
import { FeedbackReviewsComponent } from "src/pages/community/feedback-reviews/feedback-reviews.component";
import { StudentChatComponent } from "src/pages/community/student-chat/student-chat.component";
import { TutorChatComponent } from "src/pages/community/tutor-chat/tutor-chat.component";
import { HomepageComponent } from "src/pages/homepage/homepage.component";
import { NotFoundComponent } from "src/pages/not-found/not-found.component";
import { PaymentsComponent } from "src/pages/profile/payments/payments.component";
import { UserProfileComponent } from "src/pages/profile/user-profile/user-profile.component";
import { RecommendedBooksComponent } from "src/pages/resources/recommended-books/recommended-books.component";
import { ReferenceMaterialsComponent } from "src/pages/resources/reference-materials/reference-materials.component";
import { ResourceLibraryComponent } from "src/pages/resources/resource-library/resource-library.component";
import { StudyGuidesComponent } from "src/pages/resources/study-guides/study-guides.component";
import { SchedulingComponent } from "src/pages/scheduling/scheduling.component";
import { ContactUsComponent } from "src/pages/support/contact-us/contact-us.component";
import { FaqComponent } from "src/pages/support/faq/faq.component";
import { PrivacyPolicyComponent } from "src/pages/support/privacy-policy/privacy-policy.component";
import { ReportIssueComponent } from "src/pages/support/report-issue/report-issue.component";
import { TermsOfServiceComponent } from "src/pages/support/terms-of-service/terms-of-service.component";

// { path: '', pathMatch: 'full', redirectTo: '/login' },
const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'classes', component: ClassesComponent },
    //Assignments
    { path: 'assignments/practice-tests', component: PracticeTestsComponent },
    { path: 'assignments/assigned-assignments', component: AssignedAssignmentsComponent },
    { path: 'assignments/test-results', component: TestResultsComponent },
    //Scheduling
    { path: 'scheduling', component: SchedulingComponent },
    //Profile
    { path: 'profile/user-profile', component: UserProfileComponent },
    { path: 'profile/payments', component: PaymentsComponent },
    //Resourses
    { path: 'resources/resource-library', component: ResourceLibraryComponent },
    { path: 'resources/study-guides', component: StudyGuidesComponent },
    { path: 'resources/reference-materials', component: ReferenceMaterialsComponent },
    { path: 'resources/recommended-books', component: RecommendedBooksComponent },
    //Community
    { path: 'community/discussion-forums', component: DiscussionForumsComponent },
    { path: 'community/student-chat', component: StudentChatComponent },
    { path: 'community/tutor-chat', component: TutorChatComponent },
    { path: 'community/feedback-reviews', component: FeedbackReviewsComponent },
    //Support
    { path: 'support/faq', component: FaqComponent },
    { path: 'support/contact-us', component: ContactUsComponent },
    { path: 'support/report-issue', component: ReportIssueComponent },
    { path: 'support/terms-of-service', component: TermsOfServiceComponent },
    { path: 'support/privacy-policy', component: PrivacyPolicyComponent },
    //Admin
    { path: 'admin/dashboard', component: DashboardComponent },
    { path: 'admin/user-management', component: UserManagementComponent },
    { path: 'admin/content-management', component: ContentManagementComponent },
    { path: 'admin/analytics', component: AnalyticsComponent },
    { path: 'admin/settings', component: SettingsComponent },
    //Not Found
    { path: '**', component: NotFoundComponent },
  ];

  export default routes;