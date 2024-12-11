# whatsgroupMessaging

This is a simple script that runs to collect daily devotional online, convert it to a format we want, and send it to an appropriate group. It also sends out prayer and service message reminders on respective church groups.

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/tharulela/whatsgroupMessaging.git
   cd whatsgroupMessaging
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `config.js` file in the root directory and add the necessary configuration settings. Refer to the `config.example.js` file for the required settings.

4. Start the project:
   ```sh
   node todaysDevotional.js
   ```

## Usage

1. To send the daily devotional message, run the following command:
   ```sh
   node whatsapp.js
   ```

2. To send prayer and service message reminders, run the following command:
   ```sh
   node whatsappMessaging.js
   ```

## Running Tests

To run the tests, use the following command:
```sh
npm test
```
