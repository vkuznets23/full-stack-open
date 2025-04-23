# Phonebook App

The Phonebook App is a full-stack web application that I developed as part of the Full Stack Open course. This app provides a simple and efficient way to manage a personal phonebook, allowing users to store and delete contact information. The main functionality of the app includes adding contacts with specific fields like phone numbers and names, and optionally uploading profile photos for each contact.

## Key Features:

- **Contact Management:**

  - Users can add and delete phonebook entries, which consist of a name, phone number, and optional profile photo.
  - The phone number input includes a masking feature to ensure proper format (+XXX-XX-XXX-XXXX), making it easier for users to add valid numbers.

- **Validation:**
  - **Phone number validation:** Users are required to provide a valid phone number, and it must follow the defined format for consistency.
- **Photo Upload:**
  - Users have the option to upload a photo for each contact. This helps to visually associate each contact with a picture, enhancing the user experience.

* **Responsive Design:**
  - The app is fully responsive, ensuring a smooth user experience on both desktop and mobile devices. The layout adjusts appropriately to different screen sizes, making it user-friendly across platforms
* **Search Functionality:** A search bar allows users to filter contacts based on their name or other details.
* **Testing:** The app includes automated tests to ensure that the core features work as expected.

## Tech Stack

- **Frontend:** React, JavaScript, react-toastify for notifications
- **Backend:** Node.js (Express) for handling API requests and MongoDB
- **Testing:** React Testing Library, Playwright for end-to-end tests

## Installation

1. Clone the repository:

```Bash
git clone https://github.com/vkuznets23/PHONEBOOK_APP
cd PHONEBOOK_APP
```

2. Install dependencies:

```Bash
cd PHONEBOOK_CLIENT
npm install
```

```Bash
cd PHONEBOOK_SERVER
npm install
```

3. Run server and client sides

```Bash
cd PHONEBOOK_CLIENT
npm run dev
```

```Bash
cd PHONEBOOK_SERVER
npm run dev
```

The app will be available at server side: http://localhost:3001 and cleint side http://localhost:5173/

## Testing

### Server-Side Testing

The Phonebook app includes automated tests to ensure the functionality of the backend API. These tests focus on the CRUD operations (Create, Read, Update, Delete) and data validation for the contacts management system. The tests are designed to check that the backend behaves as expected under various scenarios

**Schema & Validation:**

- Verifies that missing name or phone fields in the request body are properly handled.
- Ensures the contact data schema is correctly validated.

**CRUD Operations:**

- **GET REQUEST:** Ensures that retrieving all contacts works as expected.
- **GET_ID REQUEST:** Verifies that retrieving a specific contact by ID functions correctly.
- **DELETE REQUEST:** Confirms that deleting a contact works properly
- **POST REQUEST:** Checks that creating a new contact works as intended.

These tests are run using the Node.js testing framework, and the test environment is configured to run under NODE_ENV=test to isolate test data from production data. To run the tests, use the following command:

**📦 How to Run Tests**

```Bash
npm test
```

### E2E Testing

**📦 How to Run Tests**

go to the server side and start test environment:

```Bash
cd PHONEBOOK_SERVER
npm run start:test
```

go to the client side and start:

```Bash
cd PHONEBOOK_CLIENT
npm run dev
```

go to the E2E tests:

```Bash
cd E2ETests
npm run test -- --ui
```
