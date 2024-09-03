import { create } from 'zustand';
import { useChatStore } from './chatStore';
import { Config } from '../Config';
import { toast } from 'sonner';

interface BottomBarState {
  isMicOn: boolean;
  isVideoOn: boolean;
  isChatOpen: boolean;
  toggleMic: () => void;
  toggleVideo: () => void;
  sendEmoji: () => void;
  shareDocument: () => void;
  endCall: () => Promise<void>;
  toggleInfo: () => void;
  toggleChat: () => void;
}

export const useBottomBarStore = create<BottomBarState>((set) => ({
  isMicOn: true,
  isVideoOn: true,
  isChatOpen: true,
  toggleMic: () => set((state) => ({ isMicOn: !state.isMicOn })),
  toggleVideo: () => set((state) => ({ isVideoOn: !state.isVideoOn })),
  sendEmoji: () => {/* Implement emoji reaction */ },
  shareDocument: () => {/* Implement document sharing */ },
  endCall: async () => {
    // Get the current conversation
    const messages = useChatStore.getState().messages;

    // Send the conversation to the backend
    const saveResponse = await fetch(`${Config.API_URL}/chat/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversation: { messages } }),
    });

    if (!saveResponse.ok) {
      toast.error('Failed to save conversation');
    }

    const conversationId = (await saveResponse.json()).conversation_id;

    // Redirect to the analysis page

    window.location.href = `/analysis/${conversationId}`;


  },
  toggleInfo: () => {/* Implement toggle meeting info */ },
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));