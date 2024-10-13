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
  items: JournalEntry[];
  fetchEntries: (token: string) => void;
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (id: number, entry: JournalEntry) => void;
  removeEntry: (id: number) => void;
};

const useJournalEntriesStore = create<JournalEntryStore>((set, get) => ({
  items: [], // Initial state

  // Action to fetch items from an API
  fetchEntries: async (token) => {
    try {
      console.log(`${BASE_URL}journal`);
      const response = await axios.get(`${BASE_URL}journal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Fetching items

      const data: JournalEntry[] = response.data;
      console.log(data);
      set({ items: data });
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  },

  // Action to add an item
  addEntry: (item: JournalEntry) =>
    set((state: { items: JournalEntry[] }) => ({
      items: [...state.items, item],
    })),

  // Action to remove an item
  removeEntry: (id: number) =>
    set((state: { items: JournalEntry[] }) => ({
      items: state.items.filter((item: { id: number }) => item.id !== id),
    })),

  // Action to get the count of items
  //   getItemCount: () => get().items.length,

  //  Update an item by id
  updateEntry: (id: any, updatedItem: any) =>
    set((state: { items: any[] }) => ({
      items: state.items.map((item: { id: any }) =>
        item.id === id ? updatedItem : item
      ),
    })),
}));

export default useJournalEntriesStore;
