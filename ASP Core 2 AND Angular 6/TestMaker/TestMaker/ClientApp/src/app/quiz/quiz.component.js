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
const auth_service_1 = require("../services/auth.service");
let QuizComponent = class QuizComponent {
    constructor(activatedRoute, router, http, auth, baseUrl) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.auth = auth;
        this.baseUrl = baseUrl;
        this.quiz = {};
        var id = +this.activatedRoute.snapshot.params["id"];
        console.log(id);
        if (id) {
            var url = this.baseUrl + "api/quiz/" + id;
            this.http.get(url).subscribe(result => { this.quiz = result; }, error => console.error(error));
        }
        else {
            console.log("Invalid ID: routing back to home ...");
            this.router.navigate(["home"]);
        }
    }
    onEdit() {
        this.router.navigate(["quiz/edit", this.quiz.Id]);
    }
    onDelete() {
        if (confirm("Do you really want to delete this quiz?")) {
            var url = this.baseUrl + "api/quiz/" + this.quiz.Id;
            this.http
                .delete(url)
                .subscribe(() => {
                console.log("Quiz " + this.quiz.Id + " has been deleted.");
                this.router.navigate(["home"]);
            }, error => console.log(error));
        }
    }
};
QuizComponent = __decorate([
    core_1.Component({
        selector: "quiz",
        templateUrl: './quiz.component.html',
        styleUrls: ['./quiz.component.less']
    }),
    __param(4, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, http_1.HttpClient, auth_service_1.AuthService, String])
], QuizComponent);
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map