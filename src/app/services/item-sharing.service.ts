import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QuantityChange } from '../models/quantity-change.type';
import { Item } from '../models/item.type';

@Injectable({
  providedIn: 'root'
})
export class ItemSharingService {
  readonly itemQuantity$: Subject<QuantityChange> = new Subject<QuantityChange>();

  selectedItems: Map<Item, number> = new Map<Item, number>();
}
