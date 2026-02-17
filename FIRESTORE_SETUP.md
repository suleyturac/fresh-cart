# Firestore Setup Guide

## How to Add Data to Firestore

Go to [Firebase Console](https://console.firebase.google.com/project/curbsidedistribution-888e0/firestore) and create two collections:

---

## Collection: `products`

Each document should have these fields:

| Field | Type | Example |
|-------|------|---------|
| name | string | "Banana, Cavendish, Premium, 40 lb Case" |
| sku | string | "FR1001" |
| uom | string | "Case" |
| uomQty | number | 40 |
| pricePerUnit | number | 0.55 |
| totalPrice | number | 22.00 |
| category | string | "Fruits" |
| seller | string | "Valley View Produce" |
| image | string | "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&h=120&fit=crop" |

### Sample Products to Add:

**Document 1:**
```json
{
  "name": "Banana, Cavendish, Premium, 40 lb Case",
  "sku": "FR1001",
  "uom": "Case",
  "uomQty": 40,
  "pricePerUnit": 0.55,
  "totalPrice": 22.00,
  "category": "Fruits",
  "seller": "Valley View Produce",
  "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&h=120&fit=crop"
}
```

**Document 2:**
```json
{
  "name": "Apple, Gala, Washington, 88 Count",
  "sku": "FR1002",
  "uom": "Count",
  "uomQty": 88,
  "pricePerUnit": 0.45,
  "totalPrice": 39.60,
  "category": "Fruits",
  "seller": "Krystal Fruits & Vegs",
  "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=120&h=120&fit=crop"
}
```

**Document 3:**
```json
{
  "name": "Broccoli Crown, Fresh, 14 Count",
  "sku": "VG3001",
  "uom": "Count",
  "uomQty": 14,
  "pricePerUnit": 1.80,
  "totalPrice": 25.20,
  "category": "Vegetables",
  "seller": "Valley View Produce",
  "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=120&h=120&fit=crop"
}
```

**Document 4:**
```json
{
  "name": "Tomato, Roma, 25 lb Case",
  "sku": "VG3002",
  "uom": "Case",
  "uomQty": 25,
  "pricePerUnit": 0.95,
  "totalPrice": 23.75,
  "category": "Vegetables",
  "seller": "Krystal Fruits & Vegs",
  "image": "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=120&h=120&fit=crop"
}
```

---

## Collection: `blogPosts`

Each document should have these fields:

| Field | Type | Example |
|-------|------|---------|
| slug | string | "how-to-choose-wholesale-produce-supplier-nyc" |
| title | string | "How to Choose the Best Wholesale Produce Supplier in NYC" |
| excerpt | string | "A guide for restaurant owners..." |
| content | string | Full markdown-like content |
| image | string | "https://images.unsplash.com/..." |
| author | string | "Curbside Distribution" |
| date | string | "2026-02-10" |
| category | string | "Industry Guide" |
| readTime | string | "5 min read" |

### Sample Blog Post:

```json
{
  "slug": "how-to-choose-wholesale-produce-supplier-nyc",
  "title": "How to Choose the Best Wholesale Produce Supplier in NYC",
  "excerpt": "A comprehensive guide for restaurant owners in the NY metro area on selecting reliable produce wholesalers with competitive bulk pricing.",
  "content": "Finding the right wholesale produce supplier can make or break your restaurant's profitability...",
  "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
  "author": "Curbside Distribution",
  "date": "2026-02-10",
  "category": "Industry Guide",
  "readTime": "5 min read"
}
```

---

## Firestore Rules

Make sure your Firestore rules allow read access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /blogPosts/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Firebase Authentication

Enable **Email/Password** authentication in your Firebase Console:
1. Go to Authentication → Sign-in method
2. Enable Email/Password provider
3. Users can then sign up and log in to access the ordering platform
