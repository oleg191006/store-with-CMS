# Store with CMS - Повний посібник з запуску

Це повнофункціональний e-commerce проект з CMS (Content Management System), побудований на Next.js (клієнтська частина) та NestJS (серверна частина).

## 📋 Зміст

- [Технології](#технології)
- [Передумови](#передумови)
- [Структура проекту](#структура-проекту)
- [Встановлення](#встановлення)
- [Налаштування бази даних](#налаштування-бази-даних)
- [Налаштування змінних середовища](#налаштування-змінних-середовища)
- [Запуск проекту](#запуск-проекту)
- [Доступні скрипти](#доступні-скрипти)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## 🚀 Технології

### Frontend (client-side)

- **Next.js 16** - React фреймворк
- **React 19** - UI бібліотека
- **TypeScript** - типізація
- **Redux Toolkit** - управління станом
- **TanStack Query** - управління серверним станом
- **Tailwind CSS** - стилізація
- **Radix UI** - компоненти UI
- **Axios** - HTTP клієнт
- **React Hook Form** - управління формами
- **Zod** - валідація схем

### Backend (server-side)

- **NestJS 11** - Node.js фреймворк
- **TypeScript** - типізація
- **Prisma** - ORM для бази даних
- **PostgreSQL** - база даних
- **Passport** - аутентифікація
- **JWT** - токени авторизації
- **Google OAuth 2.0** - соціальна авторизація
- **Stripe** - платіжна система
- **Argon2** - хешування паролів

## 📦 Передумови

Перед початком роботи переконайтеся, що у вас встановлено:

- **Node.js** версії 18.x або вище
- **npm** версії 9.x або вище (або **yarn**)
- **PostgreSQL** версії 14.x або вище
- **Git**

Перевірити версії можна командами:

```bash
node --version
npm --version
psql --version
```

## 📁 Структура проекту

```
store-with-CMS/
├── client-side/          # Frontend додаток (Next.js)
│   ├── src/
│   │   ├── app/         # App Router сторінки
│   │   ├── components/  # React компоненти
│   │   ├── services/    # API сервіси
│   │   ├── store/       # Redux store
│   │   ├── hooks/       # Custom hooks
│   │   └── ...
│   └── package.json
│
├── server-side/          # Backend API (NestJS)
│   ├── src/
│   │   ├── auth/        # Аутентифікація
│   │   ├── user/        # Користувачі
│   │   ├── product/     # Продукти
│   │   ├── order/       # Замовлення
│   │   ├── store/       # Магазини
│   │   ├── category/    # Категорії
│   │   ├── color/       # Кольори
│   │   ├── review/      # Відгуки
│   │   ├── payment/     # Платежі
│   │   └── ...
│   ├── prisma/          # Prisma схема БД
│   ├── uploads/         # Завантажені файли
│   └── package.json
│
└── docs/                 # Документація
```

## 🔧 Встановлення

### 1. Клонування репозиторію

```bash
git clone https://github.com/oleg191006/store-with-CMS.git
cd store-with-CMS
```

### 2. Встановлення залежностей

#### Для серверної частини:

```bash
cd server-side
npm install
```

#### Для клієнтської частини:

```bash
cd ../client-side
npm install
```

## 🗄️ Налаштування бази даних

### 1. Встановлення PostgreSQL

Якщо PostgreSQL ще не встановлено:

**Windows:**

- Завантажте інсталятор з [postgresql.org](https://www.postgresql.org/download/windows/)
- Запустіть інсталятор та слідуйте інструкціям
- Запам'ятайте пароль для користувача `postgres`

**macOS:**

```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Створення бази даних

Підключіться до PostgreSQL:

```bash
psql -U postgres
```

Створіть базу даних:

```sql
CREATE DATABASE store;
\q
```

## ⚙️ Налаштування змінних середовища

### Backend (server-side)

Створіть файл `.env` в директорії `server-side/`:

```bash
cd server-side
```

Створіть файл `.env` з наступним вмістом:

```env
# База даних
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/store?schema=public"

# JWT секрет (згенеруйте безпечний ключ)
JWT_SECRET="your_secure_jwt_secret_key_here"

# URL адреси
CLIENT_URL="http://localhost:3000"
SERVER_URL="http://localhost:5000"
SERVER_DOMAIN="localhost"

# Порт сервера
PORT=5000

# Google OAuth (отримайте на https://console.cloud.google.com/)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CALLBACK_URL="http://localhost:5000/auth/google/callback"

# Stripe (отримайте на https://dashboard.stripe.com/)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret"
```

**Важливо:** Замініть значення на свої власні:

- `YOUR_PASSWORD` - ваш пароль PostgreSQL
- `your_secure_jwt_secret_key_here` - згенеруйте безпечний секретний ключ
- Google OAuth креденшали - отримайте на [Google Cloud Console](https://console.cloud.google.com/)
- Stripe ключі - отримайте на [Stripe Dashboard](https://dashboard.stripe.com/)

### Frontend (client-side)

Створіть файл `.env.local` в директорії `client-side/`:

```bash
cd ../client-side
```

Створіть файл `.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

## 🎯 Запуск проекту

### 1. Міграція бази даних

Перед першим запуском необхідно застосувати міграції Prisma:

```bash
cd server-side
npx prisma generate
npx prisma migrate dev --name init
```

Ця команда:

- Згенерує Prisma Client
- Створить таблиці в базі даних
- Застосує всі міграції

### 2. Запуск Backend сервера

В директорії `server-side/`:

```bash
# Режим розробки (з hot-reload)
npm run start:dev

# або Production режим
npm run build
npm run start:prod
```

Сервер буде доступний на: `http://localhost:5000`

### 3. Запуск Frontend додатку

В **новому терміналі**, в директорії `client-side/`:

```bash
# Режим розробки
npm run dev

# або Production режим
npm run build
npm run start
```

Frontend буде доступний на: `http://localhost:3000`

## 🎮 Доступні скрипти

### Backend (server-side)

```bash
# Розробка
npm run start:dev          # Запуск з hot-reload
npm run start:debug        # Запуск з debugger

# Production
npm run build              # Збірка проекту
npm run start:prod         # Запуск production версії

# Тестування
npm run test               # Запуск тестів
npm run test:watch         # Тести в watch режимі
npm run test:cov           # Тести з покриттям

# Лінтинг
npm run lint               # Перевірка коду
npm run format             # Форматування коду

# Prisma
npx prisma studio          # Відкрити Prisma Studio (GUI для БД)
npx prisma migrate dev     # Створити нову міграцію
npx prisma generate        # Згенерувати Prisma Client
```

### Frontend (client-side)

```bash
# Розробка
npm run dev                # Запуск dev сервера

# Production
npm run build              # Збірка проекту
npm run start              # Запуск production версії

# Лінтинг
npm run lint               # Перевірка коду
```

## 🔌 API Endpoints

Базова URL: `http://localhost:5000`

### Аутентифікація

- `POST /auth/register` - Реєстрація
- `POST /auth/login` - Вхід
- `POST /auth/logout` - Вихід
- `GET /auth/google` - Google OAuth
- `GET /auth/google/callback` - Google OAuth callback

### Користувачі

- `GET /user/profile` - Отримати профіль
- `PUT /user/profile` - Оновити профіль
- `PATCH /user/profile/avatar` - Оновити аватар
- `PATCH /user/profile/favorites/:productId` - Додати/видалити з обраного

### Продукти

- `GET /product` - Список продуктів (з пагінацією)
- `GET /product/:id` - Деталі продукту
- `GET /product/by-category/:categoryId` - Продукти по категорії
- `GET /product/similar/:id` - Схожі продукти
- `POST /product` - Створити продукт (auth)
- `PUT /product/:id` - Оновити продукт (auth)
- `DELETE /product/:id` - Видалити продукт (auth)

### Магазини

- `GET /store` - Список магазинів
- `GET /store/:id` - Деталі магазину
- `POST /store` - Створити магазин (auth)
- `PUT /store/:id` - Оновити магазин (auth)
- `DELETE /store/:id` - Видалити магазин (auth)

### Категорії

- `GET /category` - Список категорій
- `GET /category/:id` - Деталі категорії
- `POST /category` - Створити категорію (auth)
- `PUT /category/:id` - Оновити категорію (auth)
- `DELETE /category/:id` - Видалити категорію (auth)

### Кольори

- `GET /color` - Список кольорів
- `POST /color` - Створити колір (auth)
- `DELETE /color/:id` - Видалити колір (auth)

### Замовлення

- `GET /order` - Мої замовлення (auth)
- `GET /order/:id` - Деталі замовлення (auth)
- `POST /order` - Створити замовлення (auth)

### Відгуки

- `GET /review/by-product/:productId` - Відгуки продукту
- `POST /review/:productId/:storeId` - Створити відгук (auth)
- `DELETE /review/:id` - Видалити відгук (auth)

### Статистика

- `GET /statistics/:storeId` - Статистика магазину (auth)

### Файли

- `POST /file` - Завантажити файл (auth)
- `DELETE /file` - Видалити файл (auth)

### Платежі (Stripe)

- `POST /webhook` - Stripe webhook
