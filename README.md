# Store with CMS

A full-stack e-commerce platform with Content Management System built with modern web technologies.

## Project Structure

This project consists of two main parts:

- **client-side**: Next.js frontend application
- **server-side**: NestJS backend API

## Documentation

- [Database Schema](./DATABASE_SCHEMA.md) - Complete Entity Relationship Diagram and model descriptions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/oleg191006/store-with-CMS.git
cd store-with-CMS
```

2. Set up the server-side application
```bash
cd server-side
npm install
```

3. Set up the client-side application
```bash
cd ../client-side
npm install
```

### Configuration

Create `.env` files in both client-side and server-side directories with the necessary environment variables.

For server-side, you'll need:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Running the Application

**Server-side (Backend):**
```bash
cd server-side
npm run start:dev
```

**Client-side (Frontend):**
```bash
cd client-side
npm run dev
```

## Database

The application uses PostgreSQL with Prisma ORM. See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for detailed information about the database structure and relationships.

### Database Models

The system includes the following main entities:
- **User**: Application users
- **Store**: Online stores owned by users
- **Product**: Items for sale in stores
- **Category**: Product categorization
- **Color**: Product color options
- **Review**: User reviews for products and stores
- **Order**: Customer orders
- **OrderItem**: Individual items in orders

## Technologies

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## License

This project is licensed under the MIT License.
