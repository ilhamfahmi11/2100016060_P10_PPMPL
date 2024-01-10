// ! Dont change this code
const {
  fetchProductsData,
  setProductsCards,
  convertToRupiah,
  countDiscount,
} = require("../src/index.js");
const cartData = require("../src/data/cart.js");

// @ Write your code here

// Asyncronous Testing
// https://jestjs.io/docs/asynchronous

describe("Product API Testing", () => {
  test("should return product data with id 1", async () => {
    const productId = 1;
    const productData = await fetchProductsData(productId);
    expect(productData.id).toBe(productId);
  });

  test("should check products.length with limit", async () => {
    const productsLimit = 30;
    const productData = await fetchProductsData();
    expect(productData.products.length).toBe(productsLimit);
  });

  test("should return product data with id 7", async () => {
    const productId = 7;
    const productData = await fetchProductsData(productId);
    expect(productData.id).toBe(productId);
    expect(productData.title).toEqual("Samsung Galaxy Book"); 
  });

  test("should return product data with id 12", async () => {
    const productId = 12;
    const productData = await fetchProductsData(productId);
    expect(productData.id).toBe(productId);
  });
});

// Mocking
// https://jestjs.io/docs/mock-functions

const { fetchCartsData } = require('../src/dataService');

jest.mock('../src/dataservice', () => {
  const originalModule = jest.requireActual('../src/dataservice');
  return {
    ...originalModule,
    __esModule: true,
    fetchCartsData: jest.fn(),
  };
});

describe('Cart API Testing', () => {
  test('should compare total cart items with length of fetched data', async () => {
    fetchCartsData.mockResolvedValue(cartData.carts);
    const cartsData = await fetchCartsData();
    const totalItems = cartsData.length;
    const expectedTotal = cartData.total;
    expect(totalItems).toBe(expectedTotal);
  });

  test('should compare total length of carts data with total', async () => {
    fetchCartsData.mockResolvedValue([
      { id: 1, productId: 1, quantity: 1 },
      { id: 2, productId: 2, quantity: 2 },
      { id: 3, productId: 3, quantity: 3 },
    ]);
    const cartsData = await fetchCartsData();
    const totalLength = cartsData.reduce((acc, cart) => acc + cart.quantity, 0);
    expect(totalLength).toBe(6);
  });

  test('should compare total length of carts data with total - variation', async () => {
    fetchCartsData.mockResolvedValue([
      { id: 4, productId: 4, quantity: 4 },
      { id: 5, productId: 5, quantity: 5 },
    ]);
    const cartsData = await fetchCartsData();
    const totalLength = cartsData.reduce((acc, cart) => acc + cart.quantity, 0);
    expect(totalLength).toBe(9);
  });
}); 

// Setup & Teardown
// https://jestjs.io/docs/setup-teardown

let productData;

beforeAll(async () => {
  productData = await fetchProductsData();
});

describe("Product Utility Testing", () => {
  describe("convertToRupiah", () => {
    test('should convert 200 dollars into rupiah', () => {
      const priceInRupiah = convertToRupiah(200);
      expect(priceInRupiah).toMatch(/Rp\s3\.087\.200,\d{2}/);
      expect(typeof priceInRupiah).toBe('string');
    });
    
    test('should convert 1500 dollars into rupiah', () => {
      const priceInRupiah = convertToRupiah(1500);
      expect(priceInRupiah).toMatch(/Rp\s23\.154\.000,\d{2}/);
    });

    test('should convert 750 dollars into rupiah', () => {
      const priceInRupiah = convertToRupiah(750);
      expect(priceInRupiah).toMatch(/Rp\s11\.577\.000,\d{2}/);
    });      
  });

  describe("countDiscount", () => {
    test("it should calculate discounted price correctly", () => {
      const price = 1500;
      const discount = 15;
      const result = countDiscount(price, discount);
      expect(result).toEqual(1275);
    });

    test("it should handle zero discount", () => {
      const price = 2000;
      const discount = 0;
      const result = countDiscount(price, discount);
      expect(result).toEqual(2000);
    });

    test("it should handle 25% discount", () => {
      const price = 1000;
      const discount = 25;
      const result = countDiscount(price, discount);
      expect(result).toEqual(750);
    });
  });

  describe("setProductsCards", () => {
    test("it should return an array of products with specific keys", () => {
      const productsCards = setProductsCards(productData.products);
      const firstProductKeys = Object.keys(productsCards[0]);
      const expectedKeys = ["price", "after_discount", "image"];
      expect(firstProductKeys).toEqual(expect.arrayContaining(expectedKeys));
    });
  });
});

// index.test.js

test('Traininig-jest', () => {
  expect(1 + 1).toBe(2);
});