import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { useAudioStore } from './audioStore';
import { Config } from '../Config';
import { Message, MessageSource } from '../types/chat';
import { createRef } from 'react';

interface ChatStore {
  messages: Message[];
  addMessage: (role: MessageSource, content: string) => void;
  deleteMessage: (id: string) => void;
  bottomOfChatRef: React.RefObject<HTMLDivElement>;
  setBottomOfChatRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

const getQuestion = () => {
  // Get the query params from the url
  const url = new URL(window.location.href);
  const question = url.searchParams.get('question');

  if (question === '1') {
    return 'Design a product to help people start exercising again.';
  } else if (question === '2') {
    return 'Design an Analytics Platform (Metrics & Logging)'
  } else {
    return 'What is the difference between BRD vs SRS vs FRS?'
  }
}

const sampleMessages: Message[] = [
  {
    id: nanoid(),
    role: 'system',
    content: `You will play the role of being an interviewer for a [product design] interview question. The question you will ask is ["${getQuestion()}"] After every prompt you will ask follow-up questions based on the content that was presented, or if you think their answer was comprehensive you can ask them to continue, or if they ask a question, answer those questions - you want to guide the interviewee to perform as best as possible. Each message you send should be concise and to the point. Be emotive and liberal with exclamation marks. EACH MESSAGE MAY ONLY BE 200 WORDS MAX - the shorter the better. You should not be explaining things, you should be lightly guiding the interviewee in the right direction only if needed. Every once in a while, add in stutters like "uh", "um", or "L-like this", to make the interview more natural. Keep in mind that the interview should be no more than 30 minutes, so allow them to proceed or ask questions accordingly. Keep in mind that the interviewee will continue to proceed and offer more insight until you are given the prompt that "Interview has ended."

First, the interviewee will ask you questions - you should be responding to these questions and only wait until they finish asking questions to start asking them questions about their approach. Second, the interviewee will present their solution and you will ask them follow-up questions ONLY if crucial to provide more context to you. 
`,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: nanoid(),
    role: 'assistant',
    content: `Hello! Nice to meet you. My name is Tanya. I will be conducting this interview today. Let's begin! For our first question, you're gonna need to do this. ${getQuestion()}. Let's think about it and discuss!`,
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  // {
  //   id: nanoid(),
  //   role: 'user',
  //   content: 'Certainly! I have been working as a full-stack developer for the past 3 years, primarily using React and Node.js.',
  //   timestamp: new Date(Date.now() - 180000), // 3 minutes ago
  // },
  // {
  //   id: nanoid(),
  //   role: 'assistant',
  //   content: 'That\'s great! Can you describe a challenging project you\'ve worked on recently?',
  //   timestamp: new Date(Date.now() - 120000), // 2 minutes ago
  // },
];


export const useChatStore = create<ChatStore>((set, get) => ({
  messages: sampleMessages,
  bottomOfChatRef: createRef<HTMLDivElement>(),
  setBottomOfChatRef: (ref) => set({ bottomOfChatRef: ref }),

  addMessage: async (role, content) => {

    // Don't send empty messages to the server
    if (content === '') {
      return;
    }

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: nanoid(),
          role,
          content,
          timestamp: new Date(),
        },
      ],
    }));

    const response = await fetch(`${Config.API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation: {
          messages: get().messages,
        },
      }),
    });

    const data = await response.json();


    // // play audio at data.vo_id
    // const audio = new Audio(data.vo_id);
    // audio.play();
    if (data.vo_id) {
      useAudioStore.getState().setCurrentlyPlayingUrl(`${Config.API_URL}/${data.vo_id}`);

      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: data.id,
            role: 'assistant',
            content: data.content,
            timestamp: new Date(),
          },
        ],
      }))
      get().bottomOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  },

  deleteMessage: (id) => set((state) => ({
    messages: state.messages.filter((message) => message.id !== id),
  })),
}));