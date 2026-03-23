import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)"
]);

//for these routes, i dont want my middleware to redirect (inf loop)
const isOrgFreeRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/org-selection(.*)"
]);
export default clerkMiddleware(async (auth, req)=> {
  console.log("MIDDLEWARE RUNNING:", req.nextUrl.pathname);
  const { userId, orgId } = await auth();

  if(!isPublicRoute(req)){
    await auth.protect();
  }

  
  // Logged in but NO org → force to org selection
  // (allow org-selection itself to pass through)
  if (
    userId &&
    !orgId &&
    !req.nextUrl.pathname.startsWith('/org-selection')
  ) {
    return NextResponse.redirect(new URL('/org-selection', req.url))
  }

  // Has org but going to org-selection → redirect to dashboard
  if (userId && orgId && req.nextUrl.pathname.startsWith('/org-selection')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}