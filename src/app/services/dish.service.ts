import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor(
    private http: HttpClient
  ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(1000));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/?featured=true')
      .pipe(map(dishes => dishes[0]));
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(1000));
  }

  getDishIds(): Observable<string [] | any>{
    return this.getDishes()
      //.pipe(map(dishes => dishes.map(dish => dish.id)));
      .pipe(map(z => z.map(n => n.id)));
    //return of(DISHES.map(dish => dish.id));
  }
}
