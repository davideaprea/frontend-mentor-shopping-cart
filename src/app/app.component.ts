import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';
import { Item } from './models/item.type';
import { Observable } from 'rxjs';
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
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly itemService: ItemService = inject(ItemService);

  readonly items$: Observable<Item[]> = this.itemService.getItems();
}
