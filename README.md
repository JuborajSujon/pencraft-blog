# Pencraft Blog Server Side

### Live Site URL:

Vercel Hosting : [https://pencraft-blog.vercel.app](https://pencraft-blog.vercel.app)

**Admin Login Credentials:**

```json
{
  "email": "admin@admin.com",
  "password": "securepassword"
}
```

## Features and Characteristics:

- Create, Read, Update, and Delete (CRUD) operations
- Utilizes TypeScript for strong typing
- Uses Express.js for routing and middleware
- Integrates MongoDB for data storage
- Utilizes Mongoose for MongoDB object modeling
- Utilizes Zod for data validation
- Utilizes bcrypt for password hashing
- Utilizes JWT for authentication and authorization
- Supports environment variables with dotenv

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible remotely
- npm or yarn package manager installed

## Installation: :computer:

1. Clone the repository from GitHub:

```
git clone https://github.com/JuborajSujon/pencraft-blog.git

```

2. Navigate to the project directory:

```
cd pencraft-blog
```

3. Install dependencies using npm or yarn:

```
npm install
```

or

```
yarn install
```

4. Set up environment variables:Create a .env file in the root directory and add the following variables:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=<your-mongodb-uri>
BCRYPT_SALT_ROUNDS=8
JWT_ACCESS_SECRET= <your-access-token-secret>
JWT_ACCESS_EXPIRES_IN=1d
```

## Usage: :book:

1. Start the development server:

```
npm run start:dev
```

The server should now be running on http://localhost:5000

## API Endpoints

**Find all API Endpoints in Postman collection json file in the repositroy**

**1. Authentication**

`POST` /api/auth/register : Register a new user

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

`POST` /api/auth/login : Login a user

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**2. Blog Management**

**Request Header:** Authorization: Bearer `<token>`

`POST` /api/blogs : Create a new blog

```json
{
  "title": "My First Blog",
  "content": "This is the content of my first blog."
}
```

`PATCH` /api/blogs/:id : Update a blog by ID

```json
{
  "title": "Updated Blog Title",
  "content": "Updated blog content"
}
```

`DELETE` /api/blogs/:id : Delete a blog by ID

`GET` /api/blogs : Get all blogs with query parameters (Public Route no need to token)

- search: search blogs by title or content
- sortBy: sort blogs by a specific field
- sortOrder: sort the results in ascending or descending order
- filter: filter blogs by author id

**Example Usage:**

```
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

**3. Admin Actions**

**Request Header:** Authorization: Bearer `<admin_token>`

`PATCH` /api/admin/users/:userId/block : Block a user by user ID

`DELETE` /api/admin/blogs/:id : Delete a blog by blog ID

## Conclusion: :rocket:

Enjoy exploring and discovering your favorite Pencraft Blog Server services! :rocket:::rocket:::rocket:
