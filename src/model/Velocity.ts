import type { Engineer } from "@model/Engineer";
import type { SprintData } from "@model/Sprint";

export type Velocity = {
  engineer: Engineer;
  sprint: SprintData;
};
