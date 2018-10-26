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
let AnswerEditComponent = class AnswerEditComponent {
    constructor(activatedRoute, router, http, baseUrl) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.baseUrl = baseUrl;
        // create an empty object from the Answer interface
        this.answer = {};
        var id = +this.activatedRoute.snapshot.params["id"];
        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");
        if (this.editMode) {
            // fetch the quiz from the server
            var url = this.baseUrl + "api/answer/" + id;
            this.http.get(url).subscribe(res => {
                this.answer = res;
                this.title = "Edit - " + this.answer.Text;
            }, error => console.error(error));
        }
        else {
            this.answer.QuestionId = id;
            this.title = "Create a new Answer";
        }
    }
    onSubmit(answer) {
        var url = this.baseUrl + "api/answer";
        if (this.editMode) {
            this.http
                .post(url, answer)
                .subscribe(res => {
                var v = res;
                console.log("Answer " + v.Id + " has been updated.");
                this.router.navigate(["question/edit", v.QuestionId]);
            }, error => console.log(error));
        }
        else {
            this.http
                .put(url, answer)
                .subscribe(res => {
                var v = res;
                console.log("Answer " + v.Id + " has been created.");
                this.router.navigate(["question/edit", v.QuestionId]);
            }, error => console.log(error));
        }
    }
    onBack() {
        this.router.navigate(["question/edit", this.answer.QuestionId]);
    }
};
AnswerEditComponent = __decorate([
    core_1.Component({
        selector: "answer-edit",
        templateUrl: './answer-edit.component.html',
        styleUrls: ['./answer-edit.component.less']
    }),
    __param(3, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        http_1.HttpClient, String])
], AnswerEditComponent);
exports.AnswerEditComponent = AnswerEditComponent;
//# sourceMappingURL=answer-edit.component.js.map