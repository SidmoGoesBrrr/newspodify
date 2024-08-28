import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define your public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/landing_page(.*)',
  '/', // Public homepage
  // Add any other public routes here
]);

export default clerkMiddleware((auth, req) => {
  if (req.nextUrl.pathname === '/main') {
    auth().protect(); // Protect only the /main route
  } else if (!isPublicRoute(req)) {
    auth().protect(); // Protect all other routes not explicitly public
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
