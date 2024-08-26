import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Note } from "./note-maker/note.model";

@Injectable({
    providedIn: "root" 
})
export class DevAPIService{
    apiUrl = environment.apiUrl;
    private httpClient = inject(HttpClient);

    getCurrentUser(): Observable<any>{
        return this.httpClient.get(this.apiUrl + 'auth/users/current-user/');
    }

    getChatbotResponse(paramsObj?: { [key: string]: any }): Observable<any>{
        let params = new HttpParams();

        if (paramsObj) {
            Object.keys(paramsObj).forEach(key => {
                params = params.set(key, paramsObj[key]);
            });
        }
        return this.httpClient.get(this.apiUrl + 'chat/ai', { params });
    }


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

    getTaskAlerts(): Observable<any>{
        return this.httpClient.get(this.apiUrl + 'track/tasks/alerts/');
    }

    getProjectList(): Observable<any>{
        return this.httpClient.get(this.apiUrl + 'track/projects/');
    }
    
    getProjectDetail(id: string): Observable<any>{
        return this.httpClient.get(this.apiUrl + 'track/projects/' + id + '/');
    }

    createProject(formData: any) {
        return this.httpClient.post(this.apiUrl + 'track/projects/',formData);
    }

    getAllNotes(): Observable<Note[]>{
        return this.httpClient.get<Note[]>(this.apiUrl + 'log/notes/');
    }

    createNote(postData: any): Observable<Note>{
        return this.httpClient.post<Note>(this.apiUrl + 'log/notes/', postData);
    }

    updateNote(resData: any, note_id : string): Observable<any>{
        return this.httpClient.put(this.apiUrl + 'log/notes/' + note_id + '/', resData);
    }
    
}