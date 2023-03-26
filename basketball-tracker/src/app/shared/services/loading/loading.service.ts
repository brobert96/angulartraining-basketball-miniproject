import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingFlag = false;

  constructor() { }

  startLoading() {
    this.isLoadingFlag = true;
  }

  stopLoading() {
    this.isLoadingFlag = false;
  }

  isLoading(): boolean {
    return this.isLoadingFlag;
  }
}
