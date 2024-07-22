import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';
import { Item } from './models/item.type';
import { Subject, Observable } from 'rxjs';
import { CardComponent } from './components/card/card.component';
import { AsyncPipe } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    CardComponent,
    CartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly itemService: ItemService = inject(ItemService);

  readonly items$: Observable<Item[]> = this.itemService.getItems();
  readonly itemQuantity$: Subject<{ item: Item, quantity: number }> = new Subject<{ item: Item, quantity: number }>();
  readonly selectedItems: { [key: string]: number } = {};

  ngOnInit(): void {
    this.itemQuantity$.subscribe(change => {
      if (change.quantity > 0) this.selectedItems[change.item.name] = change.quantity;
      else delete this.selectedItems[change.item.name];
    });
  }

  changeQuantity(quantity: number, item: Item): void {
    this.itemQuantity$.next({
      quantity: quantity,
      item: item
    });
  }
}
