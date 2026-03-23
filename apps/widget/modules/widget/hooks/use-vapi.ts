import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";
interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}
export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    
    useEffect(() => {
        //only for testing the vapi api (customers will provide their own API keys)
        const vapiInstance = new Vapi("7c349591-ca3f-4e7a-88d3-0c5b04594385");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });
        
        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.error("Vapi error:", error);
            setIsConnecting(false);
        });
        vapiInstance.on("message", (message) => {
            if(message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev, 
                    {
                        role: message.role === 'user' ? "user" : "assistant",
                        text: message.transcript
                    }
                ]);
            }
        });

        return () => {
            vapiInstance?.stop();
        }

    }, []);
    const startCall = () => {
        setIsConnecting(true);
        if(vapi) {
            //only for testing the vapi api (customers will provide their own Assitant IDs)
            vapi.start("81a8cd1b-57b4-4654-bf3e-f423b6bc2f4f");
        }
    }
    const endCall = () => {
        vapi?.stop();
    }
    return {
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        startCall,
        endCall
    }
}