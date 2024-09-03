import { create } from 'zustand';

interface AudioStore {
  micStream?: MediaStream;
  actualMicStream?: MediaStream;
  setMicStream: (stream: MediaStream) => void;
  setActualMicStream: (stream: MediaStream) => void;
  currentlyPlayingUrl: string | null;
  setCurrentlyPlayingUrl: (url: string | null) => void;
}

export const useAudioStore = create<AudioStore>()((set) => ({
  micStream: undefined,
  setMicStream: (stream) => set({ micStream: stream }),
  actualMicStream: undefined,
  setActualMicStream: (stream) => set({ actualMicStream: stream }),
  currentlyPlayingUrl: null,
  setCurrentlyPlayingUrl: (url: string | null) => set({ currentlyPlayingUrl: url }),
}));