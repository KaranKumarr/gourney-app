export const BASE_API_URL = process.env.EXPO_PUBLIC_GOURNEY_API_URL;

export const sortOptions = [
  {
    name: "Date Created",
    value: "entryDateTime",
  },
  {
    name: "Title",
    value: "title",
  },
  {
    name: "Last Updated",
    value: "updatedAt",
  },
];

export const getSortNameByValue = (val: string) => {
  const option = sortOptions.find((op) => {
    return op.value === val;
  });
  return option?.name ?? null;
};
