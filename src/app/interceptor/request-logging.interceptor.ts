import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggingService } from '../services/logging.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements HttpInterceptor {
	constructor(private loggingService: LoggingService, private spinnerService: SpinnerService) { }

	count = 0;

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		this.spinnerService.showSpinner();
		this.count++;
		return next.handle(req)
			.pipe(
				tap((event) => {
					this.loggingService.info('>>>> Request >>>> ', req);
				}),
				finalize(() => {
					this.count--;
					if (this.count === 0) {
						this.spinnerService.hideSpinner();
					}
				})
			);
	}
}
