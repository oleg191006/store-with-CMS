# Class Diagram

Alternative view of the database schema as a class diagram.

## Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String email
        +String password
        +String name
        +String picture
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class Store {
        +String id
        +String title
        +String description
        +String userId
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class Product {
        +String id
        +String title
        +String description
        +Int price
        +String[] images
        +String storeId
        +String categoryId
        +String colorId
        +String userId
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class Category {
        +String id
        +String title
        +String description
        +String storeId
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class Color {
        +String id
        +String name
        +String value
        +String storeId
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class Review {
        +String id
        +String text
        +Int rating
        +String storeId
        +String userId
        +String productId
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class Order {
        +String id
        +EnumOrdersStatus status
        +Int total
        +String userId
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class OrderItem {
        +String id
        +Int quantity
        +Int price
        +String orderId
        +String productId
        +String storeId
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class EnumOrdersStatus {
        <<enumeration>>
        PENDING
        PAYED
    }
    
    note for EnumOrdersStatus "Enum values as defined in Prisma schema"

    User "1" --> "*" Store : owns
    User "1" --> "*" Product : favorites
    User "1" --> "*" Review : writes
    User "1" --> "*" Order : places
    
    Store "1" --> "*" Product : contains
    Store "1" --> "*" Category : has
    Store "1" --> "*" Color : defines
    Store "1" --> "*" Review : receives
    Store "1" --> "*" OrderItem : tracks
    
    Product "*" --> "1" Store : belongs to
    Product "*" --> "0..1" Category : categorized by
    Product "*" --> "0..1" Color : has color
    Product "1" --> "*" Review : receives
    Product "1" --> "*" OrderItem : included in
    
    Review "*" --> "0..1" User : written by
    Review "*" --> "0..1" Store : for store
    Review "*" --> "0..1" Product : about product
    
    Order "1" --> "*" OrderItem : contains
    Order "*" --> "0..1" User : placed by
    Order "1" --> "1" EnumOrdersStatus : has status
    
    OrderItem "*" --> "1" Order : part of
    OrderItem "*" --> "1" Product : references
    OrderItem "*" --> "0..1" Store : from store
```

## Relationships Summary

### One-to-Many Relationships
- **User → Store**: A user can own multiple stores
- **User → Product**: A user can favorite multiple products
- **User → Review**: A user can write multiple reviews
- **User → Order**: A user can place multiple orders
- **Store → Product**: A store can have multiple products
- **Store → Category**: A store can have multiple categories
- **Store → Color**: A store can define multiple colors
- **Store → Review**: A store can receive multiple reviews
- **Product → Review**: A product can have multiple reviews
- **Product → OrderItem**: A product can be in multiple order items
- **Order → OrderItem**: An order can contain multiple items

### Many-to-One Relationships
- **Store → User**: Many stores belong to one user
- **Product → Store**: Many products belong to one store
- **Product → Category**: Many products can belong to one category (optional)
- **Product → Color**: Many products can have one color (optional)
- **Category → Store**: Many categories belong to one store
- **Color → Store**: Many colors belong to one store
- **Review → User**: Many reviews written by one user
- **Review → Store**: Many reviews for one store
- **Review → Product**: Many reviews about one product
- **Order → User**: Many orders placed by one user
- **OrderItem → Order**: Many items belong to one order
- **OrderItem → Product**: Many order items reference one product
- **OrderItem → Store**: Many order items from one store

### Special Relationships
- **User ↔ Product**: Many-to-many relationship through favorites
- **Order → EnumOrdersStatus**: Enum relationship for order status tracking
