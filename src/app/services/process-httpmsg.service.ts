import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

//explore why this is public and why it's outside the constructor
  public handleError(error: HttpErrorResponse | any){
    let errMsg: string;
    if (error.error instanceof ErrorEvent){
      errMsg = error.error.message;
      } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }
    return throwError(errMsg);
    //so you're returning a function
  }

}
