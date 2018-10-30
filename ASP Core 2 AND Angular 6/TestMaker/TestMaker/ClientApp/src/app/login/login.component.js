"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const auth_service_1 = require("../services/auth.service");
let LoginComponent = class LoginComponent {
    constructor(router, fb, authService, baseUrl) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
        this.baseUrl = baseUrl;
        this.title = "User Login";
        // initialize the form
        this.createForm();
    }
    createForm() {
        this.form = this.fb.group({
            Username: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required]
        });
    }
    onSubmit() {
        var url = this.baseUrl + "api/token/auth";
        var username = this.form.value.Username;
        var password = this.form.value.Password;
        this.authService.login(username, password)
            .subscribe(() => {
            // login successful
            // outputs the login info through a JS alert.
            // IMPORTANT: remove this when test is done.
            alert("Login successful! "
                + "USERNAME: "
                + username
                + " TOKEN: "
                + this.authService.getAuth().token);
            this.router.navigate(["home"]);
        }, err => {
            // login failed
            console.log(err);
            this.form.setErrors({
                "auth": "Incorrect username or password"
            });
        });
    }
    onBack() {
        this.router.navigate(["home"]);
    }
    // retrieve a FormControl
    getFormControl(name) {
        return this.form.get(name);
    }
    // returns TRUE if the FormControl is valid
    isValid(name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    }
    // returns TRUE if the FormControl has been changed
    isChanged(name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }
    // returns TRUE if the FormControl is invalid after user changes
    hasError(name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: "login",
        templateUrl: "./login.component.html",
        styleUrls: ['./login.component.css']
    }),
    __param(3, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [router_1.Router,
        forms_1.FormBuilder,
        auth_service_1.AuthService, String])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map