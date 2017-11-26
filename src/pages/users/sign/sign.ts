import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../../service/auth/auth.service';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PizzasListPage} from '../../pizzas/list/list';

@Component({
  selector: 'page-sign',
  templateUrl: './sign.html'
})
export class SignPage implements OnInit, OnDestroy {

  public haveAccount: boolean;
  public form: FormGroup;
  public currentUser: User;
  public errors: boolean;
  private subscription: any;

  constructor(private userService: UserService,
              private authService: AuthService,
              private navParams: NavParams,
              private navCtrl: NavController) {
    this.errors = false;
  }

  ngOnInit() {
    this.haveAccount = this.navParams.get('haveAccount');
    this.currentUser = new User();
    if (this.haveAccount) {
      this.form = new FormGroup({
        email: new FormControl(this.currentUser.email, Validators.compose([
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
          Validators.required
        ])),
        password: new FormControl(this.currentUser.password, Validators.compose([
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
          Validators.required
        ]))
      });
    } else {
      this.form = new FormGroup({
        firstName: new FormControl(this.currentUser.firstName, Validators.compose([
          Validators.minLength(0),
          Validators.required
        ])),
        lastName: new FormControl(this.currentUser.lastName, Validators.compose([
          Validators.minLength(0),
          Validators.required
        ])),
        email: new FormControl(this.currentUser.email, Validators.compose([
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
          Validators.required
        ])),
        password: new FormControl(this.currentUser.password, Validators.compose([
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
          Validators.required
        ]))
      });
    }
  }

  ngOnDestroy() {
  }

  // function to sign in
  signin(): void {
    this.currentUser = this.form.value;
    this.subscription = this.userService.signIn(this.currentUser.email, this.currentUser.password)
      .subscribe((data) => {
          this.authService.setToken(data.response);
        },
        (err) => {
          this.errors = true;
        });
    this.navCtrl.setRoot(PizzasListPage);
  }

  // function to sign up
  signup(): void {
    this.currentUser = this.form.value;
    this.subscription = this.userService.signUp(this.currentUser)
      .subscribe((data) => {
          this.authService.setToken(data.response);
        },
        (err) => {
          this.errors = true;
        });
    this.navCtrl.setRoot(PizzasListPage);
  }

}
