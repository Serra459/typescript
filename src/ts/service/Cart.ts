import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

     // Суммарная стоимость без скидки
    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    // Суммарная стоимость со скидкой
    getTotalPriceWithDiscount(discount: number): number {
        if (discount < 0 || discount > 100) {
            throw new Error('Discount must be between 0 and 100');
        }
        const total = this.getTotalPrice();
        return total * (1 - discount / 100);
    }

    // Удаление товара по ID
    removeItemById(id: number): void {
        const index = this._items.findIndex(item => item.id == id);
        if (index !== -1) {
            this._items.splice(index, 1);
        }
    }
}