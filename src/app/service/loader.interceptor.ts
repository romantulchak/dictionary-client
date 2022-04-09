import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderUrlConstant } from "../constants/loader-url.constant";
import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.checkUrls(req.url)){
            this.loaderService.isLoading.next(true);
        }  
        return next.handle(req).pipe(
            finalize(
                () =>{
                    setTimeout(() => {
                     this.loaderService.isLoading.next(false);
                    }, 700);
                }
            )
        )
    }

    private checkUrls(currentUrl: string): boolean{
        return LoaderUrlConstant.URLS_TO_BE_SKIPED.filter(url => currentUrl.endsWith(url)).length > 0;
    }
}

export const loaderInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ];