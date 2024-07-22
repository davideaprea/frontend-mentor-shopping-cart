import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item.type';
import { Subject } from 'rxjs';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit{
  readonly itemMap: Map<Item, number> = new Map<Item, number>();

  @Input({ required: true }) itemQuantity$!: Subject<{ item: Item, quantity: number }>;

  totalItems: number = 0;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.itemQuantity$.subscribe(change => {
      const quantityDiff: number = change.quantity - (this.itemMap.get(change.item) ?? 0);

      if(change.quantity > 0) this.itemMap.set(change.item, change.quantity);
      else this.itemMap.delete(change.item);

      this.totalItems += quantityDiff;
      this.totalPrice += quantityDiff * change.item.price;
    });
  }

  deleteItem(item: Item): void {
    this.itemQuantity$.next({
      item: item,
      quantity: 0
    });
  }
}
