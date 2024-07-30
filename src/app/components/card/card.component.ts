import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item.type';
import { NgClass } from '@angular/common';
import { ItemSharingService } from '../../services/item-sharing.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit{
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly itemSharingService: ItemSharingService = inject(ItemSharingService);

  @Input({ required: true }) item!: Item;

  selectedQuantity: number = 0;

  ngOnInit(): void {
    this.itemSharingService
    .getItemSubject(this.item)
    .subscribe(quantity => {
      this.selectedQuantity = quantity;
      this.changeDetectorRef.markForCheck();
    });
  }

  incrementQuantity(): void {
    this.itemSharingService.updateItemQuantity(this.item, ++this.selectedQuantity);
  }

  decrementQuantity(): void {
    this.itemSharingService.updateItemQuantity(this.item, --this.selectedQuantity);
  }
}
