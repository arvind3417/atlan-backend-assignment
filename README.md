## Key Features

1. **Efficient Response Management:** Ingests and processes user responses from forms with ease.
2. **Seamless Google Sheets Integration:** Syncs response data directly to designated sheets for analysis.
3. **Reliable Error Handling:** Implements robust mechanisms for handling failures and ensuring data consistency.
4. **Scalable Architecture:** Dynamically scales to handle increased workload with distributed queues and load balancing.
5. **Plug-n-Play Extension:** Implemented an interface for new use cases to be plugged in, allowing for the customization of response processing based on specific business logic.


### Architecture

1. Implemented Design
![Atlan](https://github.com/arvind3417/atlan-backend-assignment/assets/91880276/b9f81d25-981c-442e-93d8-45bbc52e06c5)

2. Desired Design
![Desired-Design](https://github.com/arvind3417/atlan-backend-assignment/assets/91880276/ad7bac4e-0e7d-458d-915e-f228764ebe14)










### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/arvind3417/atlan-backend-assignment.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd atlan-backend-assignment
   ```

### Docker Setup

1. **Build Docker Images**
   ```bash
   docker-compose build
   ```

2. **Run Docker Containers**
   ```bash
   docker-compose up -d
   ```

### Models and Associations

1. **Form**
   - **Attributes**:
     - `formID` (integer, auto-incremented): Unique identifier for the form.
     - `title` (string): Title of the form.
     - `description` (string): Description of the form.
     - `metadata` (string): Additional metadata related to the form.
     - `questions` (array of Question objects): Questions associated with the form.
     - `responses` (array of Response objects): Responses associated with the form.

2. **Question**
   - **Attributes**:
     - `questionID` (integer, auto-incremented): Unique identifier for the question.
     - `text` (string): Text of the question.
     - `type` (string): Type of the question.
     - `metadata` (string): Additional metadata related to the question.
     - `form` (Form object): Form to which the question belongs.
     - `answers` (array of Answer objects): Answers associated with the question.

3. **Answer**
   - **Attributes**:
     - `answerID` (integer, auto-incremented): Unique identifier for the answer.
     - `value` (string): Value of the answer.
     - `metadata` (string): Additional metadata related to the answer.
     - `response` (Response object): Response to which the answer belongs.
     - `question` (Question object): Question to which the answer belongs.

4. **Response**
   - **Attributes**:
     - `responseID` (integer, auto-incremented): Unique identifier for the response.
     - `timestamp` (datetime): Timestamp of when the response was created.
     - `metadata` (string): Additional metadata related to the response.
     - `form` (Form object): Form to which the response belongs.
     - `answers` (array of Answer objects): Answers associated with the response.





# API Documentation

This document provides an overview of the endpoints available in our API.

## Forms 

### Endpoints

- **Create a Form**
  - Method: `POST`
  - Route: `/forms`

- **Get All Forms**
  - Method: `GET`
  - Route: `/forms`

- **Get Form by ID**
  - Method: `GET`
  - Route: `/forms/:id`

- **Update Form**
  - Method: `PUT`
  - Route: `/forms/:id`

- **Delete Form**
  - Method: `DELETE`
  - Route: `/forms/:id`

## Answers 

### Endpoints

- **Create an Answer**
  - Method: `POST`
  - Route: `/answers`

- **Get Answers by Response ID**
  - Method: `GET`
  - Route: `/answers/:responseId`

- **Get Answer by ID**
  - Method: `GET`
  - Route: `/answers/:responseId/:answerId`

- **Update Answer**
  - Method: `PUT`
  - Route: `/answers/:responseId/:answerId`

- **Delete Answer**
  - Method: `DELETE`
  - Route: `/answers/:responseId/:answerId`

## Questions 

### Endpoints

- **Create a Question**
  - Method: `POST`
  - Route: `/questions`

- **Get Questions by Form ID**
  - Method: `GET`
  - Route: `/questions/:formId`

- **Get Question by ID**
  - Method: `GET`
  - Route: `/questions/:formId/:questionId`

- **Update Question**
  - Method: `PUT`
  - Route: `/questions/:formId/:questionId`

- **Delete Question**
  - Method: `DELETE`
  - Route: `/questions/:formId/:questionId`

## Responses 

### Endpoints

- **Create a Response with Answers**
  - Method: `POST`
  - Route: `/responses`

- **Get Responses by Form ID**
  - Method: `GET`
  - Route: `/responses/:formId`

- **Get Response by ID**
  - Method: `GET`
  - Route: `/responses/:formId/:responseId`

- **Update Response**
  - Method: `PUT`
  - Route: `/responses/:formId/:responseId`

- **Delete Response**
  - Method: `DELETE`
  - Route: `/responses/:formId/:responseId`

---


