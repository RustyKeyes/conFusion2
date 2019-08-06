import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})

export class PromotionService {

  constructor() { }

  //// getPromotions(): Promotion[] {
  getPromotions(): Promise<Promotion[]> {
  ////  return PROMOTIONS;
  //  return Promise.resolve(PROMOTIONS);
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS), 2000); // Simulate server latency with 2 second delay
    });
  }

  //// getPromotion(id: string): Promotion {
  getPromotion(id: string): Promise<Promotion> {
  ////  return PROMOTIONS.filter((promotion) => (promotion.id === id))[0];
  //  return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]);
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000); // Simulate server latency with 2 second delay
    });
  }

  //// getFeaturedPromotion(): Promotion {
  getFeaturedPromotion(): Promise<Promotion> {
  ////  return PROMOTIONS.filter((promotion) => (promotion.featured))[0];
  //  return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000); // Simulate server latency with 2 second delay
    });
  }

}
