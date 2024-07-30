import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.type';
import { SelectedItems } from '../models/selected-items.type';

@Injectable({
  providedIn: 'root'
})
export class ItemSharingService {
  private _selectedItems: SelectedItems = new Map<Item, BehaviorSubject<number>>();
  private itemsChange$: BehaviorSubject<SelectedItems> = new BehaviorSubject<SelectedItems>(this._selectedItems);
  private _totalItems: number = 0;
  private _totalPrice: number = 0;

  itemsChangeObs$: Observable<SelectedItems> = this.itemsChange$.asObservable();

  get selectedItems(): SelectedItems {
    return this._selectedItems;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  getItemSubject(item: Item): Observable<number> {
    if (this._selectedItems.has(item)) return this._selectedItems.get(item)!;

    const newSubj: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    this._selectedItems.set(item, newSubj);
    this.itemsChange$.next(this.selectedItems);
    return newSubj.asObservable();
  }

  updateItemQuantity(item: Item, quantity: number): void {
    const checkedQuantity: number = quantity >= 0 ? quantity : 0;
    const itemSubj: BehaviorSubject<number> = this._selectedItems.get(item)!;
    const quantityDiff: number = checkedQuantity - itemSubj.value;

    this._totalItems += quantityDiff;
    this._totalPrice += quantityDiff * item.price;

    itemSubj.next(checkedQuantity);
    this.itemsChange$.next(this.selectedItems);
  }
}
