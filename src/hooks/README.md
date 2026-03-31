# useLocalStorage Hook

## Overview
A custom React hook that syncs component state with browser `localStorage`. This hook automatically saves and loads data from localStorage, persisting your app state across page refreshes and browser sessions.

## Features
✅ **Automatic persistence** - Syncs state with localStorage automatically  
✅ **Error handling** - Gracefully handles JSON parse/stringify errors  
✅ **Tab synchronization** - Updates state when another tab modifies the same localStorage key  
✅ **Flexible initial values** - Supports any data type as initial value  
✅ **Functional updates** - Works with `setValue(prev => newState)` like useState  

---

## Usage

### Basic Example
```javascript
import useLocalStorage from "./hooks/useLocalStorage";

function MyComponent() {
  // Just like useState, but with localStorage persistence
  const [cart, setCart] = useLocalStorage("cart", []);
  
  // Add to cart
  const addItem = (product) => {
    setCart([...cart, product]);
  };
  
  return (
    <div>
      <button onClick={() => addItem({ id: 1, name: "Product" })}>
        Add Item
      </button>
      <p>Cart Items: {cart.length}</p>
    </div>
  );
}
```

### With Functional Updates
```javascript
const [cart, setCart] = useLocalStorage("cart", []);

// Same as useState - can use functional update
setCart(prev => [...prev, newItem]);
```

---

## How It Works for Cart Items

### When Adding to Cart
```javascript
const handleAddToCart = (product) => {
  setCart((prev) => {
    const exists = prev.find((item) => item.id === product.id);
    
    if (exists) {
      // Item already in cart - increase quantity
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    }
    
    // New item - add with qty: 1
    return [...prev, { ...product, qty: 1 }];
  });
};
// ✅ Automatically saved to localStorage
```

### When Removing from Cart
```javascript
const handleRemoveFromCart = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id));
};
// ✅ Automatically saved to localStorage
```

### When Decreasing Quantity
```javascript
const handleDecrease = (id) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0) // Remove items with qty 0
  );
};
// ✅ Items with qty 0 are automatically removed and saved to localStorage
```

---

## What Gets Stored

Each cart item contains:
```javascript
{
  id: 1,                    // Product ID
  title: "Product Name",    // Product name
  price: 299.99,           // Product price
  image: "url/to/image",   // Product image
  stock: 5,                // Available stock
  qty: 1,                  // Quantity in cart
  // ... plus any other product properties from the API
}
```

---

## localStorage Structure

The cart is stored in localStorage as:
```javascript
localStorage.getItem("cart")
// Returns: '[{"id":1,"title":"Product","price":299.99,"image":"...","stock":5,"qty":1}]'

// Or parsed:
JSON.parse(localStorage.getItem("cart"))
// Returns: [{ id: 1, title: "...", price: 299.99, qty: 1, ... }]
```

---

## Benefits

| Feature | Benefit |
|---------|---------|
| **Persistent Cart** | Users don't lose cart items when refreshing or closing the page |
| **Reload Preservation** | Page refresh loads cart from localStorage automatically |
| **Multi-Tab Sync** | Changes in one tab reflect in other tabs in real-time |
| **Simple API** | Same interface as useState - easy to migrate |
| **Error Safe** | Handles corrupted data gracefully |

---

## API Reference

```javascript
const [value, setValue] = useLocalStorage(key, initialValue);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | string | localStorage key name (e.g., "cart", "user-prefs") |
| `initialValue` | any | Default value if key doesn't exist in localStorage |
| `value` | any | Current value (loaded from localStorage or initialValue) |
| `setValue` | function | Update function (saves to localStorage automatically) |

---

## Clearing Cart

To clear the cart completely:
```javascript
// Option 1: Set to empty array
setCart([]);

// Option 2: Remove from localStorage entirely
localStorage.removeItem("cart");
```

---

## Browser Console Testing

Test in your browser console:
```javascript
// View saved cart
localStorage.getItem("cart");

// Clear cart
localStorage.removeItem("cart");

// View all localStorage keys
Object.keys(localStorage);
```

---

## Notes

⚠️ **localStorage Limits**: Most browsers limit localStorage to ~5-10MB per domain  
⚠️ **Sync Across Tabs**: Works with `storage` event listener (not real-time within same tab)  
⚠️ **JSON Serialization**: Objects must be JSON-serializable (avoid functions, Dates require special handling)
