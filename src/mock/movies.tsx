export const movies = [
  {
    id: 1,
    title: "Movie 1",
    description: "Description 1",
    image: "https://picsum.photos/200/100?random=1",
  },
  {
    id: 2,
    title: "Movie 2",
    description: "Description 2",
    image: "https://picsum.photos/200/100?random=2",
  },
  {
    id: 3,
    title: "Movie 3",
    description: "Description 3",
    image: "https://picsum.photos/200/100?random=3",
  },
  {
    id: 4,
    title: "Movie 4",
    description: "Description 4",
    image: "https://picsum.photos/200/100?random=4",
  },
  {
    id: 5,
    title: "Movie 5",
    description: "Description 5",
    image: "https://picsum.photos/200/100?random=5",
  },
  {
    id: 6,
    title: "Movie 6",
    description: "Description 6",
    image: "https://picsum.photos/200/100?random=6",
  },
  {
    id: 7,
    title: "Movie 7",
    description: "Description 7",
    image: "https://picsum.photos/200/100?random=7",
  },
  {
    id: 8,
    title: "Movie 8",
    description: "Description 8",
    image: "https://picsum.photos/200/100?random=8",
  },
  {
    id: 9,
    title: "Movie 9",
    description: "Description 9",
    image: "https://picsum.photos/200/100?random=9",
  },
  {
    id: 10,
    title: "Movie 10",
    description: "Description 10",
    image: "https://picsum.photos/200/100?random=10",
  },
] as const;

export type Movie = (typeof movies)[number];
