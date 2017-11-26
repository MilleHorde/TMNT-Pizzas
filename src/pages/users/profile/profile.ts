import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'page-profile',
  templateUrl: './profile.html'
})
export class UserProfilePage implements OnInit{

  public currentUser: User;
  public form: FormGroup;
  public success: boolean;
  public error: boolean;

  constructor(public navCtrl: NavController,
              private userService: UserService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
    this.currentUser = new User();
    this.form = new FormGroup({
      lastName: new FormControl(this.currentUser.lastName, Validators.compose([
        Validators.minLength(0)
      ])),
      firstName: new FormControl(this.currentUser.firstName, Validators.compose([
        Validators.minLength(0)
      ])),
      password: new FormControl(this.currentUser.password, Validators.compose([
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
      ]))
    });
    this.userService.getMe()
      .subscribe((data) => {
        this.currentUser.lastName = data.response.lastName;
        this.currentUser.firstName = data.response.firstName;
        this.currentUser._id = data.response._id;
        this.form.controls['lastName'].patchValue(this.currentUser.lastName);
        this.form.controls['firstName'].patchValue(this.currentUser.firstName);
      });
  }

  // function to edit user
  edit() {
    const toSend = {};

    if (this.form.value.password) {
      toSend['password'] = this.form.value.password;
    }
    toSend['lastName'] = this.form.value.lastName;
    toSend['firstName'] = this.form.value.firstName;

    this.userService.update(toSend, this.currentUser._id)
      .subscribe((data) => {
        this.success = true;
      },(data) => {
        this.error = true;
      });
  }

}
