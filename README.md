# Techno Shop

## About

This is a demo Next.js app

## Running the project

- In the root folder run `npm install` to install all the necessary dependencies
- In the root folder run `npm run dev` to run start the project in development mode

## Prisma

Run the following command to generate the changes:

`npx prisma generate`

And the following command to update the database with the changes:

`npx prisma db push`

## Tech Stack

`Next.js`, `Tailwind`, `Shadcn`

## Scripts

- `start-db` - start the docker container for the PostgreSQL database
- `stop-db` - start the docker container for the PostgreSQL database

## Dependencies

- `@auth/prisma-adapter` - prisma adapter needed for auth.js
- `@hookform/resolvers` - resolver for react-hook-form
- `@prisma/client` - client for the prisma ORM
- `@radix-ui/react-label` - default shadcn components setup
- `@radix-ui/react-slot` - default shadcn components setup
- `bcryptjs` - password hashing package
- `class-variance-authority` - default shadcn setup
- `clsx` - default shadcn setup
- `lucide-react` - default shadcn setup
- `next` - default Next setup
- `react` - default Next setup
- `react-dom` - default Next setup
- `react-hook-form` - for handling forms
- `react-icons` - icons package
- `tailwind-merge` - default shadcn setup
- `tailwindcss-animate` - default shadcn setup
- `zod` - form schema validations

## DevDependencies

- `autoprefixer` - default Next setup
- `eslint` - default Next setup
- `eslint-config-next` - default Next setup
- `postcss` - default Next setup
- `prisma` - database ORM
- `tailwindcss` - default Next setup
- `typescript` - default Next setup
