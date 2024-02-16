import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  { path: 'notes', component: NoteViewComponent, canActivate: [AuthGuard]},
  { path: 'notes/:id', component: NoteEditComponent, canDeactivate:[CanDeactivateGuard] },
  { path: 'register-user', component: RegisterFormComponent },
  { path: 'login', component:LoginComponent},
  { path: '', redirectTo: '/notes', pathMatch: 'full' }, // Default route
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for Page Not Found
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
