import axios, { AxiosResponse } from "axios";
import { RequestHandler } from "express";

import {
  FilteredResponsesQueryParamsType,
  ApiResponseType,
  FilterClauseType,
} from "../types";
import { BadRequestError } from "../utils/errors";

export const filterFormSubmissionResponses: RequestHandler = async (
  req,
  res,
  next
) => {
  const { formId } = req.params;
  const {
    filters,
    offset,
    limit,
    ...queryParams
  }: FilteredResponsesQueryParamsType = req.query;

  try {
    // Fetch the form submissions using the Fillout's submission api endpoint
    const response: AxiosResponse<ApiResponseType> = await axios.get(
      `https://api.fillout.com/v1/api/forms/${formId}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          ContentType: "application/json",
        },
        params: {
          ...queryParams,
          // If additional `filters` query param is used, don't limit the no of records returned.
          // Handle the pagination logic seperately when `filters` query param is used.
          offset: filters ? 0 : offset,
          limit: filters ? 150 : limit,
        },
      }
    );

    let data: ApiResponseType = response?.data;

    if (filters) {
      try {
        // Filter the response data using newly added filters query param
        data = await applyFilter(data, JSON.parse(filters), offset, limit);
        res.status(200).send(data);
      } catch (error: any) {
        next(error);
      }
    } else {
      // If newly added filters query param is not provided, send the original response back
      res.status(200).send(data);
    }
  } catch (error: any) {
    next(error.response?.data);
  }
};

const applyFilter = async (
  response: ApiResponseType,
  filters: FilterClauseType[],
  offset: number = 0,
  limit: number = 150
): Promise<ApiResponseType> => {
  // Get only the array of responses and rename it as formResponses
  const { responses: formResponses } = response;

  if (limit && (limit < 1 || limit > 150))
    throw new BadRequestError(
      JSON.stringify({
        message:
          "Limit must be greater than or equal to 1 and less than or equal to 150",
      })
    );

  const filteredResponses = formResponses.filter((formResponse) => {
    // Make sure all the filters are satisfied for the given set of response
    return filters.every((filter) => {
      // Step 1: Get the question matching the filter id
      const questionToCheck = formResponse.questions.find(
        (question) => question.id === filter.id
      );

      // Step 2: If question not found, filter out or skip the response
      if (!questionToCheck) return false;

      // Step 3: Validate the question's value with the filter value for
      // the matching filter condition otherwise return false
      switch (filter.condition) {
        case "equals":
          return questionToCheck.value === filter.value;
        case "does_not_equal":
          return questionToCheck.value !== filter.value;
        case "greater_than":
          return questionToCheck.value > filter.value;
        case "less_than":
          return questionToCheck.value < filter.value;
        default:
          return false;
      }
    });
  });

  // Handle pagination - update totalResponses and pageCount
  const startIndex = +offset;
  const endIndex = +offset + +limit;
  const pages = Math.ceil(filteredResponses.length / limit);

  return {
    responses: filteredResponses.slice(startIndex, endIndex),
    totalResponses: filteredResponses.length,
    pageCount: pages,
  };
};
