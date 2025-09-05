export type Config = {
  boards: BoardConfig[];
};

type BoardConfig = {
  id: number;
  name: string;
  members: MmeberConfig[];
};

type MmeberConfig = {
  displayName: string;
  name: string;
  key: string;
};
