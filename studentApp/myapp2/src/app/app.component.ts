import { Component } from '@angular/core';
import { IState } from './state.interface';
import { StateService } from './state.service';
import { IUser } from './user.interface';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </a>
        <div
          class="navbar-burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" [routerLink]="['']"> Home </a>
          <a class="navbar-item" [routerLink]="['studs']" *ngIf="state">
            Students
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control" *ngIf="!state">
                <a class="button is-primary" [routerLink]="['login']">
                  <span class="icon">
                    <i class="fa-solid fa-right-to-bracket"></i>
                  </span>
                  <span>Login</span>
                </a>
              </p>
              <p class="control" *ngIf="!state">
                <a class="button is-primary" [routerLink]="['register']">
                  <span class="icon">
                    <i class="fa-solid fa-user-plus"></i>
                  </span>
                  <span>Register</span>
                </a>
              </p>
              <p class="control" *ngIf="state">
                <a class="button is-primary" href="#">
                  <span class="icon">
                    <i class="fa-solid fa-right-from-bracket"></i>
                  </span>
                  <span>Logout</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container is-fluid">
      <div class="notification is-primary">
        <strong>STUDENT PORTAL</strong>
      </div>
      <router-outlet></router-outlet>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma</strong> by
          <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
          licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >CC BY NC SA 4.0</a
          >.
        </p>
      </div>
    </footer>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myapp2';
  state!: IState;
  constructor(private stateService: StateService) {
    this.stateService.state.subscribe((state: IState) => {
      this.state = state;
    });
  }
}
