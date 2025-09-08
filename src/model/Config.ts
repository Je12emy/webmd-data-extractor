export type Config = {
  boards: BoardConfig[];
  jira: {
    host: string;
  };
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
