import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponse } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ["./auth.component.css"]
})


export class AuthComponent {
    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){};

    isLoginMode = true;
    isLoading = false;
    error: string = null; 

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) return;
        
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponse>;

        this.isLoading = true;

        if(this.isLoginMode) {
           authObs = this.authService.login(email, password);
        } else {
           authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            responseData => {
            console.log(responseData);
            this.router.navigate(["/recipe-book"]);
            this.isLoading = false;
        }, 
        errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });

        form.reset();
    }
    
    onErrorClose() {
        this.error = null;       
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory  = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        
    }
}