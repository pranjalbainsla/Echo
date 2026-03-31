"use client"

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import { WidgetHeader } from "../components/widget-header";
import { errorMessageAtom, loadingMessageAtom, screenAtom, organizationIdAtom, contactSessionIdAtom } from "../../atoms/widget-atoms";
import { useEffect, useMemo, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";


type InitStep =  "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ( {organizationId } : { organizationId: string | null }) => {
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setLoadingMessage = useSetAtom(loadingMessageAtom);
    const setOrganizationId = useSetAtom(organizationIdAtom);
    const loadingMessage = useAtomValue(loadingMessageAtom);
    const [step, setStep] = useState<InitStep>("org");
    const [sessionValid, setSessionValid] = useState(false);
    const setScreen = useSetAtom(screenAtom);

    const sessionAtom = useMemo(() => contactSessionIdAtom(organizationId ?? ""),
    [organizationId]
    );

    const contactSessionId = useAtomValue(sessionAtom);

    const validateContactSession = useQuery(
    api.public.contactSessions.validate,
    contactSessionId ? { contactSessionId } : "skip"
    );
    const validateOrganization = useAction(api.public.organizations.validate);
   

    //step 1: validate organization
    useEffect(() =>{
        if(step !== "org") return;

        setLoadingMessage("Loading Organization...");
        if(!organizationId) {
            setErrorMessage("Organization ID is required");
            setScreen("error");
            return;
        }
        setLoadingMessage("Verifying Organization...");

        validateOrganization({ organizationId }).then((res) => {
            if(res.valid) {
                setOrganizationId(organizationId);
                setStep("session");
            }else{
                setErrorMessage(res.reason || "Invalid configuration");
                setScreen("error");
            }
        }).catch(() => {
            setErrorMessage("Failed to validate organization. Please check the organization ID and try again.");
            setScreen("error");
        });

    }, [
        step, 
        organizationId, 
        setErrorMessage, 
        setScreen,
        setOrganizationId,
        validateOrganization,
        setStep,
        setLoadingMessage
    ]);
    //step 2: validate session
    useEffect(() => {
        if(step !== "session") return;
        
        setLoadingMessage("Finding contact session ID...");
        if(!contactSessionId) {
            setSessionValid(false);
            setStep("done");
            return;
        }
        setLoadingMessage("Validating contact session...");
        if(validateContactSession === undefined) return;
        
        setSessionValid(validateContactSession.valid);
        setStep("done")
    }, [step, contactSessionId, validateContactSession, setLoadingMessage]);
    useEffect(() => {
        if(step !== "done") return;

        if(sessionValid && contactSessionId){
            setScreen("selection");
        }else{
            setScreen("auth");
        }
    }, [step, sessionValid, contactSessionId, setScreen]);


    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
                <p className="text-3xl">
                    Hi there! 👋
                </p>
                <p className="text-lg">
                    Let&apos;s get you started
                </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
                <LoaderIcon className="animate-spin" />
                <p className="text-sm">
                    {loadingMessage || "Loading..."}
                </p>
            </div>
        </>
    );
};