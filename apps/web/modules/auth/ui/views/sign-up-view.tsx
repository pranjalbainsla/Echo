import { SignUp } from "@clerk/nextjs"

export const SignUpView = () => {
    return (
        <SignUp 
            routing="hash" 
            forceRedirectUrl="/org-selection"
            signInUrl="/sign-in"/>
    )
}
