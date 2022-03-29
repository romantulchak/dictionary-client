import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.isLoading.next(true);
        return next.handle(req).pipe(
            finalize(
                () =>{
                    setTimeout(() => {
                     this.loaderService.isLoading.next(false);
                    }, 1000);
                }
            )
        )
    }
}

export const loaderInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ];