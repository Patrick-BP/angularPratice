import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { ListComponent } from './student/list.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from './state.service';
import { CheckTokenGuard } from './check-token.guard';
import { AttachTokenInterceptor } from './attach-token.interceptor';

const refreshToken = (stateService: StateService) => {
  return () => {
    const stored_state = localStorage.getItem('STATE');
    if (stored_state) {
      stateService.state.next(JSON.parse(stored_state));
    }
  };
};

const MY_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'Welcome' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'studs',
    loadChildren: () =>
      import('./student/stutent.module').then((m) => m.StutentModule),
    canActivate: [CheckTokenGuard],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(MY_ROUTES),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [StateService],
      useFactory: refreshToken,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
