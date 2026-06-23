export interface DataSet {
  id: number;
  displayName: string;
}

export interface Grouping {
  id: string;
  displayName: string;
}

export interface Analytic {
  id: string;
  displayName: string;
}

export interface GroupingNode {
  id: string;
  displayName: string;
}

export interface CalculateNode {
  id: string;
  result: number;
}

export interface SelectOption {
  id: string | number;
  displayName: string;
}

export interface ResultRow {
  nodeId: string;
  nodeName: string;
  values: Record<string, number>;
}

export interface SelectorItem {
  heading: string;
  controlName: string;
  options: SelectOption[]; 
  multiple?: boolean;
  hint?: string;
}

