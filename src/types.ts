export interface IHierarchy {
  name: string | undefined;
  description: string;
  applications: Array<IApplications>;
  levels: Array<ILevels>;
  functions: Array<IFunctions>;
  nodes: Array<HierarchyNodeModel>;
}

interface IApplications {
  applicationName: string;
  roles: string[];
}

export interface ILevels {
  levelName: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface IFunctions {
  functionName: string;
  terminationDate?: Date | string | null | any;
  numberOfPosition: number | null;
  owner: boolean;
}

export interface MyFunctionFormProps {
  name: string;
  functions: IFunctions[];
}

export interface MyApplicationsFormProps {
  name: string;
  applications: IApplications[];
}
export interface MyLevelFormProps {
  name: string;
  levels: ILevels[];
}

export interface IHierarchyDetails {
  hierarchyName: string | undefined;
}

export interface MyHierarchyFormProps {
  hierarchy: IHierarchy;
}

export interface ILastUpdate {
  timeStamp: Date | string;
  user: string;
  inverseTimeStamp: number;
}

interface IMember {
  function: IFunctions;
  user: string;
  startDate: Date | string;
  endDate?: Date | string;
}

export type HierarchyData = {
  isDirtied: boolean;
  startDate: Date | string;
  endDate?: Date | string;
  lastUpdate?: ILastUpdate;
  level: ILevels;
  member: IMember[];
};

export type HierarchyNodeModel = {
  id: string | number;
  parent: string | number;
  text: string;
  droppable?: boolean;
  data?: HierarchyData;
};
