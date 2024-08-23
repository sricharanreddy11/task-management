import { inject, Inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root" 
})
export class DevAPIService{
    apiUrl = environment.apiUrl;
    private httpClient = inject(HttpClient);


    getTaskList(): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'track/tasks/');
    }

    createTask(formData: any): Observable<any> {
        return this.httpClient.post(this.apiUrl + 'track/tasks/',formData);
    }

    updateTask(resData: any, task_id: string): Observable<any>{
        return this.httpClient.put(this.apiUrl + 'track/tasks/' + task_id + '/', resData);
    }

    getProjectList(): Observable<any>{
        return this.httpClient.get(this.apiUrl + 'track/projects/');
    } 



}