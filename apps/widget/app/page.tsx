"use client";

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { 
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        startCall,
        endCall } = useVapi();
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <Button onClick={()=>startCall()}>Start Call</Button>
          <Button onClick={()=>endCall()}>End Call</Button>
          <div>
            connection status: {isConnected ? "connected" : isConnecting ? "connecting..." : "disconnected"}
          </div>
          <div>
            speaking status: {isSpeaking ? "speaking" : "not speaking"}
          </div>
          <div>{JSON.stringify(transcript, null, 2)}</div>
        </div>
      </div>
    </div>
  )
}
