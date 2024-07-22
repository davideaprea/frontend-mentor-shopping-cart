import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  private _selectedQuantity: number = 0;
  @Output() private selectedQuantityChange: EventEmitter<number> = new EventEmitter<number>();

  @Input({required: true}) item!: Item;

  @Input() set selectedQuantity(quantity: number | undefined) {
    if(!quantity || quantity < 0) this._selectedQuantity = 0;
    else this._selectedQuantity = quantity;
  }

  incrementQuantity(): void {
    this.selectedQuantityChange.emit(++this._selectedQuantity);
  }

  decrementQuantity(): void {
    this.selectedQuantityChange.emit(--this._selectedQuantity);
  }

  get selectedQuantity(): number {
    return this._selectedQuantity;
  }
}
