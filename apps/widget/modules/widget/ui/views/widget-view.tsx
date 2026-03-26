"use client"

import { useAtomValue } from "jotai";
import  WidgetAuthScreen from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atoms";

interface Props {
    organizationId: string;
};

export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtom);

    const screenComponents = {
        auth: <WidgetAuthScreen />,
        error: <p>Error screen</p>,
        loading: <p>Loading screen</p>,
        voice: <p>Voice screen</p>,
        inbox: <p>Inbox screen</p>,
        selection: <p>Selection screen</p>,
        chat: <p>Chat screen</p>,
        contact: <p>Contact screen</p>,
    }
    return (
        <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            {screenComponents[screen]}
        </main>
    );
}

export default WidgetView;