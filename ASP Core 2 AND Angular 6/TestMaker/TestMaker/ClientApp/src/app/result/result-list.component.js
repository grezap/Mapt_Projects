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
let ResultListComponent = class ResultListComponent {
    constructor(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
        this.results = [];
    }
    ngOnChanges(changes) {
        if (typeof changes['quiz'] !== "undefined") {
            // retrieve the quiz variable change info
            var change = changes['quiz'];
            // only perform the task if the value has been changed
            if (!change.isFirstChange()) {
                // execute the Http request and retrieve the result
                this.loadData();
            }
        }
    }
    loadData() {
        var url = this.baseUrl + "api/result/All/" + this.quiz.Id;
        this.http.get(url).subscribe(res => {
            this.results = res;
        }, error => console.error(error));
    }
    onCreate() {
        this.router.navigate(["/result/create", this.quiz.Id]);
    }
    onEdit(result) {
        this.router.navigate(["/result/edit", result.Id]);
    }
    onDelete(result) {
        if (confirm("Do you really want to delete this result?")) {
            var url = this.baseUrl + "api/result/" + result.Id;
            this.http
                .delete(url)
                .subscribe(res => {
                console.log("Result " + result.Id + " has been deleted.");
                // refresh the result list
                this.loadData();
            }, error => console.log(error));
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ResultListComponent.prototype, "quiz", void 0);
ResultListComponent = __decorate([
    core_1.Component({
        selector: "result-list",
        templateUrl: './result-list.component.html',
        styleUrls: ['./result-list.component.less']
    }),
    __param(1, core_1.Inject('BASE_URL')),
    __metadata("design:paramtypes", [http_1.HttpClient, String, router_1.Router])
], ResultListComponent);
exports.ResultListComponent = ResultListComponent;
//# sourceMappingURL=result-list.component.js.map