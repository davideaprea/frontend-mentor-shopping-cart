import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.type';

@Injectable({
  providedIn: 'root'
})
export class ItemSharingService {
  private _totalItems: number = 0;
  private _totalPrice: number = 0;

  selectedItems: Map<Item, BehaviorSubject<number>> = new Map<Item, BehaviorSubject<number>>();

  get totalItems(): number {
    return this._totalItems;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  getItemSubject(item: Item): Observable<number> {
    if (this.selectedItems.has(item)) return this.selectedItems.get(item)!;

    const newSubj: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    this.selectedItems.set(item, newSubj);
    return newSubj.asObservable();
  }

  updateItemQuantity(item: Item, quantity: number): void {
    const checkedQuantity: number = quantity >= 0 ? quantity : 0;
    const itemSubj: BehaviorSubject<number> = this.selectedItems.get(item)!;
    const quantityDiff: number = checkedQuantity - itemSubj.value;

    this._totalItems += quantityDiff;
    this._totalPrice += quantityDiff * item.price;

    itemSubj.next(checkedQuantity);
  }
}
