import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    Router
  } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private authService: AuthenticationService) { }

    public newToken: string | undefined;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentAuthToken = sessionStorage.getItem('token');

        // add authorization header with jwt token if available
        if (currentAuthToken) {
            const headers = {
                'Authorization': `Bearer ${currentAuthToken}`,
            };
            request = request.clone({
                setHeaders: headers
            });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                // console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return from(this.handle(request, next).catch(error => {
                        sessionStorage.clear();
                        this.router.navigate(['/login']);
                        return error;
                      }));
                } else if (error.status === 429) {
                    confirm("Too many requests from this IP. Please try again in 10 minutes.")
                }
                return throwError(error);
            })
        );

    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {
        const accId = sessionStorage.getItem('accountid');
        const role = sessionStorage.getItem('role');
        let response = await this.authService.refreshToken({
            accountid: accId,
            role: role
        }).toPromise();
        if (response) {
            const headers = {
                'Authorization': `Bearer ${response.token}`,
                // 'Content-Type': 'application/json'
            };
            req = req.clone({
                setHeaders: headers
            });
            sessionStorage.setItem('token', response.token);
        }

        return next.handle(req).toPromise();
    }
}
