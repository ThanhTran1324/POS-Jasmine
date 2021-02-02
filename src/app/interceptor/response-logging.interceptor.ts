import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpErrorResponse,
	HttpEvent,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class ResponseLoggingInterceptor implements HttpInterceptor {
	constructor(private loggingService: LoggingService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						this.loggingService.info('<<<< Response <<<< ', event);
					}
				},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
						this.loggingService.info('<<<< Response <<<< ', err);
					}
				}
			)
		);
	}
}
