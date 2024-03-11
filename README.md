# Fillout Form API

[Fillout.com](https://www.fillout.com) is a powerful form builder, which stores responses to your online form submissions. Have created a simple REST API server which interacts with [Fillout.com’s API](https://api.fillout.com) to fetch form responses, but with an option to filter based on certain answers.

## REST API Server

You can access the REST API server hosted on Heroku - [here](https://fillout-shraddha-0cafc71085e6.herokuapp.com)

## REST API Endpoints

1. **Filter form responses**

- GET `/{formId}/filteredResponses`
- Query Params:
  - `filters`: JSON string containing filter criteria.
  - `offset`: Number of records to skip.
  - `limit`: Maximum number of records to return.
  - `afterDate`: A date string to filter submissions submitted after this date.
  - `beforeDate`: A date string to filter submissions submitted before this date.
  - `status`: Pass `in_progress` to get a list of in-progress (unfinished) submissions. By default, only `finished` submissions are returned.
  - `includeEditLink`: Pass `true` to include a link to edit the submission as `editLink`
  - `sort`: Can be `asc` or `desc`, defaults to `asc`

2. **Swagger UI**

- GET `/api-docs`

## Features of the API server

1. Same response type as the Fillout Rest API Responses endpoint.
2. Pagination using `limit` and `offset` parameters works as in the Fillout Rest API.
3. Error handling works as in the Fillout Rest API.

## Test the API Endpoints

You can test the API endpoint either via POSTMAN or via hosted Swagger UI - [here](https://fillout-shraddha-0cafc71085e6.herokuapp.com/api-docs)
