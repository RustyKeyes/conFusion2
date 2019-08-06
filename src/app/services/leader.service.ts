import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor() { }

  ////getLeaders(): Leader[] {
  getLeaders(): Promise<Leader[]> {
  ////  return LEADERS;
  //  return Promise.resolve(LEADERS);
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS), 3000); // Simulate server latency with 2 second delay
    });
  }

  //// getLeader(id: string): Leader {
  getLeader(id: string): Promise<Leader> {
  ////  return LEADERS.filter((leader) => (leader.id === id))[0];
  //  return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 3000); // Simulate server latency with 2 second delay
    });
  }

  //// getFeaturedLeader(): Leader {
  getFeaturedLeader(): Promise<Leader> {
  //// return LEADERS.filter((leader) => (leader.featured))[0];
  //  return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 3000); // Simulate server latency with 2 second delay
    });
  }

}
