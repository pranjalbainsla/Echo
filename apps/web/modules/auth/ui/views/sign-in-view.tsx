import { SignIn } from "@clerk/nextjs"

export const SignInView = () => {
    return (
        <SignIn 
            routing="hash"
            forceRedirectUrl="/org-selection"
            signUpUrl="/sign-up"/>
    )
}
