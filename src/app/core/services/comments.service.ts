import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment, CreateComment } from '../models/comment.model';
import { ErrorResponse } from '../models/error-response.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly COMMENTS_URL = environment.api.commments;

  constructor(private http:HttpClient,
    private loggerService:LoggerService) { }

  // createComment(comment: CreateComment): Observable<unknown> {
  //   return this.http
  //     .post<Comment>(`${this.BASE_URL}${this.COMMENTS_URL}`, comment)
  //     .pipe(
        
  //       catchError(this.handleError(LoggerMessage.createCommentFailure))
  //       )
  //     );
  // }

  getComments(postId: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.BASE_URL}${this.COMMENTS_URL}?postId=${postId}`)
      .pipe(
        map((comments) => {
          return comments.reverse();          
        }),
        catchError(this.handleError<Comment[]>('Get comments'))
      );
  }

  createComment(comment: CreateComment): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}${this.COMMENTS_URL}`, comment).pipe(
      catchError(this.handleError<any>('Commnent'))
    );
  }

  private handleError<T>(operation = 'operation') {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      const errorInfo = errorResponse.error as ErrorResponse;
      const errorMessage = errorInfo.message || 'Unknown error occurred';
      this.loggerService.handleError(`${operation}${errorMessage}`);
      return throwError(() => new Error(`${operation}${errorMessage}`));
    };
  }
}
