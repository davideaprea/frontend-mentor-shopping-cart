import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Item } from '../../models/item.type';
import { KeyValuePipe } from '@angular/common';
import { ItemSharingService } from '../../services/item-sharing.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  readonly itemSharingService: ItemSharingService = inject(ItemSharingService);

  deleteItem(item: Item): void {
    this.itemSharingService.updateItemQuantity(item, 0);
    this.changeDetectorRef.markForCheck();
  }
}
