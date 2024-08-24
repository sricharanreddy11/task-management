import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Note } from "./note-maker/note.model";

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