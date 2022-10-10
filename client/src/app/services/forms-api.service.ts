import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "@models/api-response";
import { Field } from "@models/field";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FormsApiService {
    private httpOptions: {} = {
        headers: {},
        responseType: 'json'
    }

    constructor(private http: HttpClient) { }

    addForm(form: Field[]): Observable<any> {
        return this.http.put<ApiResponse>('/api/forms', form, this.httpOptions).pipe(
            map((res: ApiResponse): ApiResponse => {
                return res;
            }),
            catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof HttpErrorResponse) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }

        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }
}