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
const router_1 = require("@angular/router");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
let QuizEditComponent = class QuizEditComponent {
    constructor(activatedRoute, router, http, fb, baseUrl) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Quiz interface
        this.quiz = {};
        this.createForm();
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.editMode = true;
            // fetch the quiz from the server
            var url = this.baseUrl + "api/quiz/" + id;
            this.http.get(url).subscribe(res => {
                this.quiz = res;
                this.title = "Edit - " + this.quiz.Title;
                this.updateForm();
            }, error => console.error(error));
        }
        else {
            this.editMode = false;
            this.title = "Create a new Quiz";
        }
    }
    onSubmit() {
        var tempQuiz = {};
        tempQuiz.Title = this.form.value.Title;
        tempQuiz.Description = this.form.value.Description;
        tempQuiz.Text = this.form.value.Text;
        var url = this.baseUrl + "api/quiz";
        if (this.editMode) {
            tempQuiz.Id = this.quiz.Id;
            this.http
                .post(url, tempQuiz)
                .subscribe(res => {
                var v = res;
                console.log("Quiz " + v.Id + " has been updated.");
                this.router.navigate(["home"]);
            }, error => console.log(error));
        }
        else {
            this.http
                .put(url, tempQuiz)
                .subscribe(res => {
                var q = res;
                console.log("Quiz " + q.Id + " has been created.");
                this.router.navigate(["home"]);
            }, error => console.log(error));
        }
    }
    onBack() {
        this.router.navigate(["home"]);
    }
    createForm() {
        this.form = this.fb.group({
            Title: ['', forms_1.Validators.required],
            Description: '',
            Text: ''
        });
    }
    updateForm() {
        this.form.setValue({
            Title: this.quiz.Title,
            Description: this.quiz.Description || '',
            Text: this.quiz.Text || ''
        });
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
QuizEditComponent = __decorate([
    core_1.Component({
        selector: "quiz-edit",
        templateUrl: './quiz-edit.component.html',
        styleUrls: ['./quiz-edit.component.less']
    }),
    __param(4, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        http_1.HttpClient,
        forms_1.FormBuilder, String])
], QuizEditComponent);
exports.QuizEditComponent = QuizEditComponent;
//# sourceMappingURL=quiz-edit.component.js.map