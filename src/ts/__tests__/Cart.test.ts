import Cart from '../service/Cart';
import Buyable from '../domain/Buyable';
import Movie from '../domain/Movie';

// Моковый объект товара для тестирования
const mockItem: Buyable = {
  id: 1,
  name: 'Test Item',
  price: 100,
};

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart(); // Перед каждым тестом создаем новую корзину
  });

  test('new cart should be empty', () => {
    expect(cart.items.length).toBe(0);
  });

  test('should add item to cart', () => {
    cart.add(mockItem);
    expect(cart.items.length).toBe(1);
    expect(cart.items).toContain(mockItem);
  });

  test('should return a copy of items array', () => {
    cart.add(mockItem);
    const items = cart.items;
    items.push({ ...mockItem, id: 2 }); // Попытка изменить копию
    expect(cart.items.length).toBe(1); // Оригинал не изменился
  });

  test('should calculate total price correctly', () => {
    cart.add(mockItem);
    cart.add({ ...mockItem, id: 2, price: 200 });
    expect(cart.getTotalPrice()).toBe(300);
  });

  test('should apply discount correctly', () => {
    cart.add(mockItem);
    cart.add({ ...mockItem, id: 2, price: 200 });
    expect(cart.getTotalPriceWithDiscount(10)).toBe(270); // 300 - 10%
  });

  test('should throw error if discount is invalid', () => {
    expect(() => cart.getTotalPriceWithDiscount(-10)).toThrow('Discount must be between 0 and 100');
    expect(() => cart.getTotalPriceWithDiscount(110)).toThrow('Discount must be between 0 and 100');
  });

  test('should remove item by id', () => {
    cart.add(mockItem);
    cart.add({ ...mockItem, id: 2 });
    cart.removeItemById(1);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].id).toBe(2);
  });

  test('should do nothing if item id does not exist', () => {
    cart.add(mockItem);
    cart.removeItemById(999); // Несуществующий ID
    expect(cart.items.length).toBe(1);
  });
});

describe('Cart: Movie integration', () => {
  let cart: Cart;
  const movie = new Movie(
    1,  
    199,              
    'The Matrix',             
    'The Matrix',         
    1999,               
    'USA',                
    'Welcome to the Real World', 
    'sci-fi',             
    136,          
  );

  beforeEach(() => {
    cart = new Cart(); // Создаем новую корзину перед каждым тестом
  });

  test('should add a movie to the cart', () => {
    cart.add(movie);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0]).toBe(movie); // Проверяем, что добавлен именно этот фильм
    expect(cart.items[0].name).toBe('The Matrix'); // Проверяем название
    expect(cart.items[0].price).toBe(199); // Проверяем цену
  });

  test('should calculate total price with movies correctly', () => {
    const movie2 = new Movie(
      2,  
      249,                  
      'Inception',         
      'Inception',                 
      2010,                
      'USA',               
      'Your mind is the scene of the crime',
      'sci-fi',           
      148,         
    );

    cart.add(movie);
    cart.add(movie2);

    expect(cart.getTotalPrice()).toBe(199 + 249); // 199 (The Matrix) + 249 (Inception)
  });

  test('should remove a movie by id', () => {
    cart.add(movie);
    cart.removeItemById(1); // Удаляем The Matrix по id = 1

    expect(cart.items.length).toBe(0);
  });
});