import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})

export class PromotionService {

  constructor(
    private client: HttpClient,
    private messageService: ProcessHTTPMsgService
  ) { }

  getPromotions(): Observable<Promotion[]> {
    return this.client.get<Promotion[]>(baseURL + 'Promotions')
      .pipe(catchError(this.messageService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.client.get<Promotion>(baseURL + 'Promotions/' + id)
    .pipe(catchError(this.messageService.handleError));
    //return of(Promotions.filter((Promotion) => (Promotion.id === id))[0]).pipe(delay(1000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.client.get<Promotion>(baseURL + 'Promotions/?featured=true')
      .pipe(map(Promotions => Promotions[0]))
      .pipe(catchError(this.messageService.handleError));
    //return of(Promotions.filter((Promotion) => Promotion.featured)[0]).pipe(delay(1000));
  }

  getPromotionIds(): Observable<string [] | any>{
    return this.getPromotions()
      //.pipe(map(Promotions => Promotions.map(Promotion => Promotion.id)));
      .pipe(map(z => z.map(n => n.id)))
      .pipe(catchError(error => error));
    //return of(Promotions.map(Promotion => Promotion.id));
  }
}
