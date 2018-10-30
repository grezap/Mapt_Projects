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
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let AuthService = class AuthService {
    constructor(http, platformId) {
        this.http = http;
        this.platformId = platformId;
        this.authKey = "auth";
        this.clientId = "TestMakerFree";
    }
    // performs the login
    login(username, password) {
        var url = "api/token/auth";
        var data = {
            username: username,
            password: password,
            client_id: this.clientId,
            // required when signing up with username/password
            grant_type: "password",
            // space-separated list of scopes for which the token is issued
            scope: "offline_access profile email"
        };
        return this.http.post(url, data)
            .map((res) => {
            let token = res && res.token;
            // if the token is there, login has been successful
            if (token) {
                // store username and jwt token
                this.setAuth(res);
                // successful login
                return true;
            }
            // failed login
            return Observable_1.Observable.throw('Unauthorized');
        })
            .catch(error => {
            return new Observable_1.Observable(error);
        });
    }
    // performs the logout
    logout() {
        this.setAuth(null);
        return true;
    }
    // Persist auth into localStorage or removes it if a NULL argument is given
    setAuth(auth) {
        if (common_1.isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(this.authKey, JSON.stringify(auth));
            }
            else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }
    // Retrieves the auth JSON object (or NULL if none)
    getAuth() {
        if (common_1.isPlatformBrowser(this.platformId)) {
            var i = localStorage.getItem(this.authKey);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }
    // Returns TRUE if the user is logged in, FALSE otherwise.
    isLoggedIn() {
        if (common_1.isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.authKey) != null;
        }
        return false;
    }
};
AuthService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(core_1.PLATFORM_ID)),
    __metadata("design:paramtypes", [http_1.HttpClient, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map