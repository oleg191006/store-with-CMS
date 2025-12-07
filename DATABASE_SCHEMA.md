# Database Schema

This document contains the Entity Relationship Diagram (ERD) for the Store with CMS application database.

## Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Store : "owns"
    User ||--o{ Product : "favorites"
    User ||--o{ Review : "writes"
    User ||--o{ Order : "places"
    
    Store ||--o{ Product : "contains"
    Store ||--o{ Category : "has"
    Store ||--o{ Color : "defines"
    Store ||--o{ Review : "receives"
    Store ||--o{ OrderItem : "tracks"
    
    Product }o--|| Category : "belongs_to"
    Product }o--|| Color : "has"
    Product }o--|| Store : "in"
    Product ||--o{ Review : "receives"
    Product ||--o{ OrderItem : "included_in"
    
    Category }o--|| Store : "belongs_to"
    
    Color }o--|| Store : "belongs_to"
    
    Review }o--|| User : "written_by"
    Review }o--|| Store : "for"
    Review }o--|| Product : "about"
    
    Order ||--o{ OrderItem : "contains"
    Order }o--|| User : "placed_by"
    
    OrderItem }o--|| Order : "part_of"
    OrderItem }o--|| Product : "references"
    OrderItem }o--|| Store : "from"

    User {
        String id PK
        String email UK
        String password
        String name
        String picture
        DateTime createdAt
        DateTime updatedAt
    }
    
    Store {
        String id PK
        String title
        String description
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Product {
        String id PK
        String title
        String description
        Int price
        String[] images
        String storeId FK
        String categoryId FK
        String colorId FK
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Category {
        String id PK
        String title
        String description
        String storeId FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Color {
        String id PK
        String name
        String value
        String storeId FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Review {
        String id PK
        String text
        Int rating
        String storeId FK
        String userId FK
        String productId FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Order {
        String id PK
        EnumOrdersStatus status
        Int total
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    OrderItem {
        String id PK
        Int quantity
        Int price
        String orderId FK
        String productId FK
        String storeId FK
        DateTime createdAt
        DateTime updatedAt
    }
```

## Model Descriptions

### User
Represents users of the system who can:
- Own and manage stores
- Mark products as favorites
- Write reviews
- Place orders

### Store
Represents online stores that:
- Are owned by users
- Contain multiple products
- Define categories and color schemes
- Receive reviews

### Product
Represents items for sale that:
- Belong to a store and category
- Have a color and price
- Can be favorited by users
- Can receive reviews
- Are included in orders

### Category
Represents product categories within a store for organization.

### Color
Represents color options available for products in a store.

### Review
Represents user feedback that can be:
- Written by users
- Associated with stores or products
- Rated on a numeric scale

### Order
Represents customer orders with:
- Status tracking (PENDING/PAYED)
- Multiple order items
- Total price

### OrderItem
Represents individual items within an order, tracking:
- Product quantity
- Price at time of purchase
- Associated product and store

## Order Status Enum

- `PENDING`: Order has been placed but not yet paid
- `PAYED`: Order has been paid for
