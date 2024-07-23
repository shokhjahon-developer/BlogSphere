# Blog Website

Welcome to the Blog Website! This platform allows users to view and interact with blog posts created by bloggers. Built with a PostgreSQL database and Prisma, it offers efficient data management and robust backend functionality.

## Features

- **User Registration and Login**: Users can register and log in to access personalized features.
- **Blog Post Management**: Create, update, and delete blog posts.
- **View Blog Posts**: Browse and interact with blog posts.
- **Fetch Random Posts**: Retrieve random blog posts from the database.
- **Fetch Top Posts**: Get the top 10 most viewed blog posts.
- **Fetch User Details**: View details of users along with their blog posts.
- **Fetch User Count**: Get the total number of users for administrative purposes.
- **Search by Hashtag**: Find blog posts using specific hashtags.
- **Fetch Post by ID**: Retrieve a specific blog post by its unique ID.
- **Fetch Posts by Hashtag**: Get all blog posts associated with a particular hashtag.
- **Get Users with Posts**: Retrieve users along with their blog posts.

## API Endpoints

### Blog Posts

- `GET /posts` - Retrieve all blog posts.
- `GET /posts/random` - Fetch a random blog post.
- `GET /posts/top` - Get the top 10 most viewed posts.
- `GET /posts/{id}` - Fetch a blog post by its ID.
- `GET /posts/hashtag/{hashtag}` - Get blog posts by hashtag.
- `POST /posts` - Create a new blog post.
- `PUT /posts/{id}` - Update an existing blog post.
- `DELETE /posts/{id}` - Remove a blog post.

### Users

- `GET /users` - Fetch all users with their posts.
- `GET /users/count` - Get the total number of users.
- `GET /users/{id}` - Fetch details of a user along with their blog posts.

## Installation

1. Clone the repository:

   ```bash
   [git clone https://github.com/yourusername/blog-website.git](https://github.com/shokhjahon-developer/BlogSphere.git)
