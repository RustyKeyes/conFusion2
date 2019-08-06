import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }

  ////  getDishes(): Dish[] {
  getDishes(): Promise<Dish[]> {
  ////  return DISHES;
  //  return Promise.resolve(DISHES);
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES), 1000); // Simulate server latency with 2 second delay
    });
  }

  ////  getDish(id: string): Dish {
  getDish(id: string): Promise<Dish> {
  ////  return DISHES.filter((dish) => (dish.id === id))[0];
  //  return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 1000); // Simulate server latency with 2 second delay
    });
  }

  ////  getFeaturedDish(): Dish {
  getFeaturedDish(): Promise<Dish> {
  ////  return DISHES.filter((dish) => (dish.featured))[0];
  //  return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 1000); // Simulate server latency with 2 second delay
    });
  }



}
