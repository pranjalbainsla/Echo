"use client"

import { useAtomValue } from "jotai";
import  WidgetAuthScreen from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";

interface Props {
    organizationId: string;
};

export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtom);

    const screenComponents = {
        auth: <WidgetAuthScreen />,
        error: <WidgetErrorScreen />,
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
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