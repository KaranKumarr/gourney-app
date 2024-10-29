import { create } from "zustand";
import { ApiClient } from "@/constants/api";

const apiPath = ApiClient();

export enum MoodType {
  Happy = "Happy",
  Sad = "Sad",
  Stressed = "Stressed",
  Angry = "Angry",
  Calm = "Calm",
}

export interface JournalEntry {
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

export interface NewJournalEntry {
  title: string;
  body: string;
  entryDateTime: Date;
  tags?: string[];
}

type JournalEntryStore = {
  journalEntries: JournalEntry[];
  fetchEntries: () => void;
  fetchEntryById: (id: number) => any;
  addEntry: (entry: NewJournalEntry) => void;
  updateEntry: (id: number, entry: JournalEntry) => void;
  removeEntry: (id: number) => void;
  fetchfilteredEntries: ({ sort }: { sort?: string }) => any;
};

const useJournalEntriesStore = create<JournalEntryStore>((set, get) => ({
  journalEntries: [], // Initial state
  // Action to fetch journalEntries from an API
  fetchEntries: async () => {
    apiPath
      .get("journal", null)
      .then((response) => {
        const data: JournalEntry[] = response.data;
        set({ journalEntries: data });
      })
      .catch((error) => {
        // Handle errors, including token-related errors
        console.error("API Error:", error);
        console.error("API Error:", error.message);
      });
  },

  fetchfilteredEntries: async ({ sort }) => {
    let entries: JournalEntry[] = [];

    apiPath
      .get("journal", { sort })
      .then((response) => {
        const data: JournalEntry[] = response.data;
        entries = data;
      })
      .catch((error) => {
        // Handle errors, including token-related errors
        console.error("API Error:", error);
        console.error("API Error:", error.message);
      });
    return entries;
  },

  fetchEntryById: async (id: number) => {
    return get().journalEntries.find((item) => item.id === id);
  },

  // Action to add an item
  addEntry: (item: NewJournalEntry) => {
    console.log(item);
    apiPath
      .post("journal", item, undefined)
      .then((response) => {
        const data: JournalEntry = response.data;
        set((state: { journalEntries: JournalEntry[] }) => ({
          journalEntries: [data, ...state.journalEntries],
        }));
      })
      .catch((error) => {
        // Handle errors, including token-related errors
        console.error("API Error:", error);
        console.error("API Error:", error.message);
      });
  },

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
  updateEntry: (id: any, updatedItem: any) => {
    apiPath
      .patch("journal/" + id, updatedItem, undefined)
      .then((response) => {
        const data: JournalEntry = response.data;
        console.log("data");
        console.log(data);

        set((state: { journalEntries: any[] }) => ({
          journalEntries: state.journalEntries.map((item: { id: any }) =>
            item.id === id ? updatedItem : item
          ),
        }));
      })
      .catch((error) => {
        // Handle errors, including token-related errors
        console.error("API Error:", error);
        console.error("API Error:", error.message);
      });
  },
}));

export default useJournalEntriesStore;
