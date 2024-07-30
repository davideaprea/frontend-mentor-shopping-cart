import { BehaviorSubject } from "rxjs";
import { Item } from "./item.type";

export type SelectedItems = Map<Item, BehaviorSubject<number>>;
