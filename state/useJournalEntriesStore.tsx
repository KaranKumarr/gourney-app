import { create } from "zustand";
import { AxiosError } from "axios";
import { axiosPrivate } from "@/api/axiosPrivate";

const BASE_API_URL = process.env.EXPO_PUBLIC_GOURNEY_API_URL;

interface BetweenDates {
  startDate: Date;
  endDate: Date;
}

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

type fetchJournalEntriesParams = {
  page?: number;
  count?: number;
};

type JournalEntryStore = {
  journalEntries: JournalEntry[];
  tags: { tag: string; count: number }[];
  fetchEntries: ({ page, count }: fetchJournalEntriesParams) => void;
  loadNextPage: () => void;
  resetEntries: () => void;
  fetchEntryById: (id: number) => any;
  addEntry: (entry: NewJournalEntry) => void;
  updateEntry: (id: number, entry: JournalEntry) => void;
  removeEntry: (id: number) => void;
  fetchTags: () => void;
  currentPage: number;
  totalPages: number;
};

const useJournalEntriesStore = create<JournalEntryStore>((set, get) => ({
  journalEntries: [],
  tags: [],
  currentPage: 0,
  totalPages: 0,
  // Initial state
  // Action to fetch journalEntries from an API

  fetchEntries: async ({ page = 1, count = 10 }) => {
    const { totalPages } = get();

    // Prevent fetching if the page is beyond the last page (except on the first fetch)
    if (page > totalPages && page !== 1) return;

    const params: any = {
      page,
      count,
    };

    try {
      const response = await axiosPrivate.get(BASE_API_URL + "journal", params);
      const data = response.data;
      set((state) => ({
        journalEntries:
          page === 1
            ? data.entries
            : [...state.journalEntries, ...data.entries],
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("API Error:", axiosError);
      console.error("API Error Message:", axiosError.message);
    }
  },

  loadNextPage: () => {
    const { currentPage, fetchEntries } = get();
    const nextPage = Number(currentPage) + 1;
    fetchEntries({ page: nextPage });
  },

  resetEntries: () => {
    set({ journalEntries: [], currentPage: 1, totalPages: 1 });
    get().fetchEntries({ page: 1 });
  },

  fetchTags: async () => {
    try {
      const res = await axiosPrivate.get(
        BASE_API_URL + "journal/tags",
        undefined,
      );
      const data: { tag: string; count: number }[] = res.data;
      set({ tags: data });
    } catch (error: any) {
      console.error("fetchTags API Error:", error);
      console.error("fetchTags API Error:", error.message);
    }
  },

  fetchEntryById: async (id: number) => {
    return get().journalEntries.find((item) => item.id === id);
  },

  // Action to add an item
  addEntry: async (item: NewJournalEntry) => {
    try {
      const res = await axiosPrivate.post(
        BASE_API_URL + "journal",
        item,
        undefined,
      );
      const data: JournalEntry = res.data;
      set((state: { journalEntries: JournalEntry[] }) => ({
        journalEntries: [data, ...state.journalEntries],
      }));
    } catch (error: any) {
      console.error("addEntry API Error:", error);
      console.error("addEntry API Error:", error.message);
    }
  },

  // Action to remove an item
  removeEntry: (id: number) =>
    set((state: { journalEntries: JournalEntry[] }) => ({
      journalEntries: state.journalEntries.filter(
        (item: { id: number }) => item.id !== id,
      ),
    })),

  // Action to get the count of journalEntries
  //   getItemCount: () => get().journalEntries.length,

  //  Update an item by id
  updateEntry: async (id: any, updatedItem: any) => {
    try {
      const res = await axiosPrivate.patch(
        BASE_API_URL + "journal/",
        updatedItem,
        undefined,
      );
      const data: JournalEntry = res.data;
      if (data) {
        set((state: { journalEntries: any[] }) => ({
          journalEntries: state.journalEntries.map((item: { id: any }) =>
            item.id === id ? updatedItem : item,
          ),
        }));
      }
    } catch (error: any) {
      console.error("addEntry API Error:", error);
      console.error("addEntry API Error:", error.message);
    }
  },
}));

export default useJournalEntriesStore;
