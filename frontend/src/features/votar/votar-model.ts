export interface CandidatoModel {
  id: number;
  name: string;
  urlImage: string;
  voteCount: number;
}

export const candidatosFakes: CandidatoModel[] = [
  {
    id: 1,
    name: "Alice Monteiro",
    urlImage: "https://picsum.photos/seed/alice/100",
    voteCount: 123,
  },
  {
    id: 2,
    name: "Bruno Carvalho",
    urlImage: "https://picsum.photos/seed/bruno/100",
    voteCount: 89,
  },
  {
    id: 3,
    name: "Carla Souza",
    urlImage: "https://picsum.photos/seed/carla/100",
    voteCount: 156,
  },
  {
    id: 4,
    name: "Daniel Freitas",
    urlImage: "https://picsum.photos/seed/daniel/100",
    voteCount: 42,
  },
];
