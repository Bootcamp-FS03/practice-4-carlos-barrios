import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CreatePost, Post, UpdatePost } from '../models/post.model';
import { LoggerService } from './logger.service';
import { ErrorResponse } from '../models/error-response.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly POST_URL = environment.api.post;

  constructor(private http: HttpClient, private loggerService: LoggerService) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.BASE_URL}${this.POST_URL}`)
      .pipe(map((posts) => posts.reverse()));
  }

  createPost(post: CreatePost): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}${this.POST_URL}`, post).pipe(
      tap(() =>
        this.loggerService.handleSuccess('New post created successfully')
      ),
      catchError(this.handleError<Post>('Create new post'))
    );
  }

  deletePost(postId: string): Observable<Post> {
    return this.http
      .delete<Post>(`${this.BASE_URL}${this.POST_URL}/${postId}`)
      .pipe(
        tap(() =>
          this.loggerService.handleSuccess('Post successfully deleted')
        ),
        catchError(this.handleError<Post>('Delete post'))
      );
  }

  updatePost(postId: string, post: UpdatePost): Observable<Post> {
    return this.http
      .patch<Post>(`${this.BASE_URL}${this.POST_URL}/${postId}`, post)
      .pipe(
        tap(() =>
          this.loggerService.handleSuccess('Post successfully updated')
        ),
        catchError(this.handleError<Post>('Update post'))
      );
  }

  private handleError<T>(operation: string) {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      const errorInfo = errorResponse.error as ErrorResponse;
      const errorMessage = errorInfo.message || 'Unknown error occurred';

      this.loggerService.handleError(`${operation} failed: ${errorMessage}`);

      return throwError(
        () => new Error(`${operation} failed: ${errorMessage}`)
      );
    };
  }
}
