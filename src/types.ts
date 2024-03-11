export type EntityType = {
  id: string;
  name: string;
  type?: string;
  value: number | string;
};

export type FormResponseType = {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: EntityType[];
  calculations: EntityType[];
  urlParameters: EntityType[];
  quiz: { score: number; maxScore: number };
  documents: any[];
  editLink?: string;
};

export type ApiResponseType = {
  responses: FormResponseType[];
  totalResponses: number;
  pageCount: number;
};

export type FilterClauseType = {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
};

export type FilteredResponsesQueryParamsType = {
  limit?: number;
  afterDate?: string;
  beforeDate?: string;
  offset?: number;
  status?: string;
  includeEditLink?: boolean;
  sort?: string;
  filters?: string;
};
