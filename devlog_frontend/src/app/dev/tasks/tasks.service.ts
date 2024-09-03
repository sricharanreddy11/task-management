import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: "root" 
})
export class TaskService{
    apiUrl = environment.apiUrl;
    private httpClient = inject(HttpClient);

    getTaskList(paramsObj?: { [key: string]: any }): Observable<any> {
        let params = new HttpParams();

        if (paramsObj) {
            Object.keys(paramsObj).forEach(key => {
                params = params.set(key, paramsObj[key]);
            });
        }

        return this.httpClient.get(this.apiUrl + 'track/tasks/', { params });
    }

    getTaskCount(): Observable<any> {

        return this.httpClient.get(this.apiUrl + 'track/tasks/counts');
    }

    getTaskGraphData(): Observable<any> {

        return this.httpClient.get(this.apiUrl + 'track/tasks/graph-data');
    }

    createTask(formData: any): Observable<any> {
        return this.httpClient.post(this.apiUrl + 'track/tasks/',formData);
    }

    updateTask(resData: any, task_id: string): Observable<any>{
        return this.httpClient.put(this.apiUrl + 'track/tasks/' + task_id + '/', resData);
    }
}