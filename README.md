# Leave Tracker App

## About

This is a leave tracker app that allows users to submit leave requests and admins to approve or reject them. It also allows users to view the organisational calendar and upcoming events.

## Usage

- Users can submit leave requests
- Admins & Moderators can view and edit submitted leaves
- Approved leaves trigger automatic balances updates
- Everyone can view the Organisational Calendar and see upcoming events
- Admins can add settings and edit balances

## Tech-Stack

The app was built using the following technologies:

- Next.js as the React framework
- Prisma as the ORM for migrations and database access
- PostgreSQL: database for local testing
- Next-Auth/Authjs: for authentication
- TypeScript: the programming language
- TailwindCSS: Styling
- shadcn/ui for UI components

## Getting Started

### Clone the repo

`https://github.com/Dark-Developer93/LeaveTracker.git`

Install packages
`yarn`

### Setup the .env file

- See the `.env.example` file

### Setup Prisma

`yarn prisma generate`
`yarn prisma migrate dev`

### Start the app

`yarn dev`
