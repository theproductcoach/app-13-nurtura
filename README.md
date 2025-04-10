# Nurtura: Care Management Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

Nurtura is a comprehensive care management platform designed to connect families with professional carers. The application provides separate interfaces for family members organizing care for their loved ones and professional carers offering their services.

### Key Features

- **Role-based access**: Different UIs and workflows for family members and carers
- **Family Dashboard**: Overview of care recipients, upcoming visits, and care management tools
- **Carer Dashboard**: Client management, request approvals, and availability scheduling
- **Care profiles**: Detailed information about care recipients including preferences and requirements
- **Interactive modals**: For managing clients, requests, and availability
- **Mobile-responsive design**: Optimized for all device sizes

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nurtura.git
   cd nurtura
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app` - Main application code using Next.js App Router
  - `/care` - Care profile management
  - `/dashboard` - Family user dashboard
  - `/dashboard-carer` - Professional carer dashboard
  - `/login` - Authentication
  - `/choose-role` - Role selection for new users
  - `/onboarding` - User onboarding flows for both family members and carers

## User Flows

### Family Members

1. Choose role as family member
2. Complete onboarding with personal and care recipient details
3. Access dashboard to manage care recipients, schedule visits, and add tasks
4. View detailed care profiles for each recipient
5. Connect with professional carers

### Professional Carers

1. Choose role as carer
2. Complete profile with experience, qualifications, and availability
3. Access carer dashboard to manage clients and requests
4. Use availability management to set working hours
5. Respond to care requests from families

## Component Overview

- **Modal System**: Interactive modals for forms and detailed information
- **Dashboard Cards**: Summary cards with clickable interfaces for accessing detailed information
- **Profile Management**: Tools for managing both carer profiles and care recipient profiles
- **Authentication**: Secure login and role-based access control
- **Responsive Layouts**: Adapts to mobile, tablet, and desktop views

## Building for Production

```bash
npm run build
# or
yarn build
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/) - learn about React.

## Deployment

The application can be deployed on [Vercel](https://vercel.com/) (recommended for Next.js projects) or any other hosting platform that supports Node.js applications.
