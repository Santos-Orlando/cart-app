import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  
  private _idProductEventEmitter : EventEmitter<number> = new EventEmitter();
  private _addProductEventEmitter : EventEmitter<Product> = new EventEmitter();
  
  constructor() { }

  get idProductEventEmitter(){
    return this._idProductEventEmitter;
  }

  get addProductEventEmitter(){
    return this._addProductEventEmitter;
  }
}
