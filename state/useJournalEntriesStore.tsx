import { create } from "zustand";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_GOURNEY_API_URL;

export enum MoodType {
  Happy = "Happy",
  Sad = "Sad",
  Stressed = "Stressed",
  Angry = "Angry",
  Calm = "Calm",
}

interface JournalEntry {
  id: number;
  userId: number;
  title: string;
  body: string;
  tags: string[];
  moodType: MoodType;
  entryDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

type JournalEntryStore = {
  journalEntries: JournalEntry[];
  fetchEntries: (token: string) => void;
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (id: number, entry: JournalEntry) => void;
  removeEntry: (id: number) => void;
};

const useJournalEntriesStore = create<JournalEntryStore>((set, get) => ({
  journalEntries: [], // Initial state

  // Action to fetch journalEntries from an API
  fetchEntries: async (token) => {
    try {
      console.log(`${BASE_URL}journal`);
      const response = await axios.get(`${BASE_URL}journal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Fetching journalEntries

      const data: JournalEntry[] = response.data;
      console.log(data);
      set({ journalEntries: data });
    } catch (error) {
      console.error("Failed to fetch journalEntries:", error);
    }
  },

  // Action to add an item
  addEntry: (item: JournalEntry) =>
    set((state: { journalEntries: JournalEntry[] }) => ({
      journalEntries: [...state.journalEntries, item],
    })),

  // Action to remove an item
  removeEntry: (id: number) =>
    set((state: { journalEntries: JournalEntry[] }) => ({
      journalEntries: state.journalEntries.filter(
        (item: { id: number }) => item.id !== id
      ),
    })),

  // Action to get the count of journalEntries
  //   getItemCount: () => get().journalEntries.length,

  //  Update an item by id
  updateEntry: (id: any, updatedItem: any) =>
    set((state: { journalEntries: any[] }) => ({
      journalEntries: state.journalEntries.map((item: { id: any }) =>
        item.id === id ? updatedItem : item
      ),
    })),
}));

export default useJournalEntriesStore;