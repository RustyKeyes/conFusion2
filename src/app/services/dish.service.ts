import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor(
    private client: HttpClient,
    private messageService: ProcessHTTPMsgService
  ) { }

  getDishes(): Observable<Dish[]> {
    return this.client.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.messageService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.client.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.messageService.handleError));
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(1000));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.client.get<Dish>(baseURL + 'dishes/?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.messageService.handleError));
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(1000));
  }

  getDishIds(): Observable<string [] | any>{
    return this.getDishes()
      //.pipe(map(dishes => dishes.map(dish => dish.id)));
      .pipe(map(z => z.map(n => n.id)))
      .pipe(catchError(error => error));
    //return of(DISHES.map(dish => dish.id));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.client.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.messageService.handleError));
  }
}
