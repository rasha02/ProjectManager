import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { AuthGuard} from './services/auth.guard';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AdminService} from './services/admin.service';
import { ProjectService} from './services/project.service';
import { DocumentService } from './services/document.service';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { ProjectDashboardComponent } from './dashboard/project-dashboard/project-dashboard.component';
import { EmpLeaveComponent } from './dashboard/emp-leave/emp-leave.component';
import { AddProjectsComponent } from './dashboard/add-projects/add-projects.component';
import { ProjectsListComponent } from './dashboard/projects-list/projects-list.component';
import { ClientAddComponent } from './dashboard/client-add/client-add.component';
import { ClientListComponent } from './dashboard/client-list/client-list.component';
import { ClientService } from './services/client.service';
import { ProjectDetailComponent } from './dashboard/project-detail/project-detail.component';
import { AttendanceComponent } from './dashboard/attendance/attendance.component';
import { EmpProfileComponent } from './dashboard/emp-profile/emp-profile.component';
import { EmpTimeSheetComponent } from './dashboard/emp-timesheet/emp-timesheet.component';
import { TimesheetComponent } from './dashboard/timesheet/timesheet.component';
import { MyProjectsComponent } from './dashboard/my-projects/my-projects.component';
import { EmpExpensesComponent } from './dashboard/emp-expenses/emp-expenses.component';
import { ExpensesComponent } from './dashboard/expenses/expenses.component';
import { EmpAbsencesComponent } from './dashboard/emp-absences/emp-absences.component';
import { AbsenceService} from './services/absence.service';


const routes:Routes=[
   {path: '', component:LoginComponent},

   {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard],

       children: [
          {path: '', component: LayoutComponent},
          {path: 'project-dashboard', component: ProjectDashboardComponent},
          {path: 'emp-all', component: EmployeeComponent},
          {path: 'emp-leave', component: EmpLeaveComponent},
          {path: 'project-add', component: AddProjectsComponent},
          {path: 'project-list', component: ProjectsListComponent},
          {path: 'project-detail/:idproj', component: ProjectDetailComponent},
          {path: 'client-add', component: ClientAddComponent},
          {path: 'client-list', component: ClientListComponent},
          {path: 'my-projects', component: MyProjectsComponent},
          {path: 'emp-attendance', component: AttendanceComponent},
          {path: 'emp-profile', component: EmpProfileComponent},
          {path: 'emp-expenses', component: EmpExpensesComponent},
          {path: 'expenses', component: ExpensesComponent},
          {path: 'emp-absences', component: EmpAbsencesComponent},
          {path: 'emp-timesheet', component: EmpTimeSheetComponent},
          {path: 'timesheet', component: TimesheetComponent},
          {path: 'timesheet/:iddoc/:etat/:dayNbr/:name', component: TimesheetComponent},




 ]
},

   {path: '**', component: ErrorComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ErrorComponent,
    LayoutComponent,
    AdminComponent,
    EmployeeComponent,
    ProjectDashboardComponent,
    EmpLeaveComponent,
    AddProjectsComponent,
    ProjectsListComponent,
    ClientAddComponent,
    ClientListComponent,
    ProjectDetailComponent,
    AttendanceComponent,
    EmpProfileComponent,
    EmpTimeSheetComponent,
    TimesheetComponent,
    MyProjectsComponent,
    EmpExpensesComponent,
    ExpensesComponent,
    EmpAbsencesComponent,
  /*  ProjectComponent,
    ProjectsByUserComponent,
    DocsByUserProjectComponent,
    UsersByProjectComponent,
    DocsByProjectComponent*/


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    AdminService,
    EmployeeService,
    ProjectService,
    DocumentService,
    AbsenceService,
    ClientService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
