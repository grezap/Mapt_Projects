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
let QuizListComponent = class QuizListComponent {
    constructor(http, router, baseUrl) {
        this.http = http;
        this.router = router;
        this.baseUrl = baseUrl;
    }
    ngOnInit() {
        //this.title = "Latest Quizzes";
        var url = this.baseUrl + "api/quiz/";
        switch (this.class) {
            case "latest":
            default:
                this.title = "Latest Quizzes";
                url += "latest/";
                break;
            case "byTitle":
                this.title = "Quizzes By Title";
                url += "ByTitle/";
                break;
            case "random":
                this.title = "Random Quizzes";
                url += "random/";
                break;
        }
        this.http.get(url).subscribe(result => {
            this.quizzes = result;
            console.log(this.quizzes);
        }, error => console.error(error));
    }
    onSelect(quiz) {
        this.selectedQuiz = quiz;
        console.log("quiz with Id "
            + this.selectedQuiz.Id
            + " has been selected.");
        this.router.navigate(["quiz", this.selectedQuiz.Id]);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], QuizListComponent.prototype, "class", void 0);
QuizListComponent = __decorate([
    core_1.Component({
        selector: "quiz-list",
        templateUrl: './quiz-list.component.html',
        styleUrls: ['./quiz-list.component.less']
    }),
    __param(2, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router, String])
], QuizListComponent);
exports.QuizListComponent = QuizListComponent;
//# sourceMappingURL=quiz-list.component.js.map