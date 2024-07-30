import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../models/item.type';
import { NgClass } from '@angular/common';
import { ItemSharingService } from '../../services/item-sharing.service';
import { Subscription } from 'rxjs';

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
export class CardComponent implements OnInit, OnDestroy{
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly itemSharingService: ItemSharingService = inject(ItemSharingService);

  private subscription!: Subscription;

  @Input({ required: true }) item!: Item;

  selectedQuantity: number = 0;

  ngOnInit(): void {
    this.subscription = this.itemSharingService
    .getItemSubject(this.item)
    .subscribe(quantity => {
      this.selectedQuantity = quantity;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  incrementQuantity(): void {
    this.itemSharingService.updateItemQuantity(this.item, ++this.selectedQuantity);
    this.changeDetectorRef.markForCheck();
  }

  decrementQuantity(): void {
    this.itemSharingService.updateItemQuantity(this.item, --this.selectedQuantity);
    this.changeDetectorRef.markForCheck();
  }
}
