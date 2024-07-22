import { Component, inject, OnInit } from '@angular/core';
import { Item } from '../../models/item.type';
import { KeyValuePipe } from '@angular/common';
import { ItemSharingService } from '../../services/item-sharing.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit{
  readonly itemSharingService: ItemSharingService = inject(ItemSharingService);

  totalItems: number = 0;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.itemSharingService.itemQuantity$.subscribe(change => {
      const quantityDiff: number = change.quantity - (this.selectedItems.get(change.item) ?? 0);

      if(change.quantity > 0) this.selectedItems.set(change.item, change.quantity);
      else this.selectedItems.delete(change.item);

      this.totalItems += quantityDiff;
      this.totalPrice += quantityDiff * change.item.price;
    });
  }

  deleteItem(item: Item): void {
    this.itemSharingService.itemQuantity$.next({
      item: item,
      quantity: 0
    });
  }

  get selectedItems(): Map<Item, number> {
    return this.itemSharingService.selectedItems;
  }
}
