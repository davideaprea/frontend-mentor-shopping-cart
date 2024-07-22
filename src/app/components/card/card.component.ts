import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item.type';
import { NgClass } from '@angular/common';
import { ItemSharingService } from '../../services/item-sharing.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit{
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly itemSharingService: ItemSharingService = inject(ItemSharingService);

  ngOnInit(): void {
    this.itemSharingService.itemQuantity$
    .pipe(
      filter(change => change.item.name == this.item.name)
    )
    .subscribe(change => {
      this.selectedQuantity = change.quantity;
      this.changeDetectorRef.markForCheck();
    });
  }

  @Input({ required: true }) item!: Item;

  selectedQuantity: number = 0;

  incrementQuantity(): void {
    this.itemSharingService.itemQuantity$.next({
      item: this.item,
      quantity: ++this.selectedQuantity
    });
  }

  decrementQuantity(): void {
    this.itemSharingService.itemQuantity$.next({
      item: this.item,
      quantity: --this.selectedQuantity
    });
  }
}
