import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root" 
})
export class DevAPIService{
    apiUrl = environment.apiUrl;
    private httpClient = inject(HttpClient);
}