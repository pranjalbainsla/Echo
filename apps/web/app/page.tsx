"use client"
import { Authenticated, Unauthenticated } from 'convex/react';
import { useMutation, useQuery } from 'convex/react';
import { api } from "@workspace/backend/_generated/api";
import { Button } from '@workspace/ui/components/button';
import { SignInButton, UserButton } from '@clerk/nextjs';


export default function Page() {
  const users = useQuery(api.users.getUsers)
  const addUser = useMutation(api.users.add)
  return (
    <>
      <Authenticated>
        <UserButton />
        <div className="flex min-h-svh p-6 items-center justify-center">
          <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
            <div>
              <h1 className="font-medium">Hello apps/web</h1>
              <Button onClick={() => addUser()}>Add</Button>
              {JSON.stringify(users, null, 2)}
            </div>
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        Whoops! please sign in!
        <SignInButton /> 
      </Unauthenticated>
    </>
  )
}
