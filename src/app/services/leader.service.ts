import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor(
    private client: HttpClient,
    private messageService: ProcessHTTPMsgService
  ) { }

  getLeaders(): Observable<Leader[]> {
    return this.client.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.messageService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.client.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.messageService.handleError));
    //return of(Leaders.filter((Leader) => (Leader.id === id))[0]).pipe(delay(1000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.client.get<Leader>(baseURL + 'Leadership/?featured=true')
      .pipe(map(Leaders => Leaders[0]))
      .pipe(catchError(this.messageService.handleError));
    //return of(Leaders.filter((Leader) => Leader.featured)[0]).pipe(delay(1000));
  }

  getLeaderIds(): Observable<string [] | any>{
    return this.getLeaders()
      //.pipe(map(Leaders => Leaders.map(Leader => Leader.id)));
      .pipe(map(z => z.map(n => n.id)))
      .pipe(catchError(error => error));
    //return of(Leaders.map(Leader => Leader.id));
  }
}
