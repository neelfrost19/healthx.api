# HealthX API

HealthX API is a simple and efficient API for managing staff. This project provides endpoints to create an user, get accesstoken for an user, create staff.
It's built using JavaScript and includes environment configuration and package management.

## Features

- Create new user
- Autheticate User
- Manage User

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDb

### Library used

- Joi : used for types validation of body of request
- Luxon : used for getting simplified date methods
- Uuid : used for getting unique ids
- Dotenv : used for loading envs from proccess.env
- Winston : used for logging
- Jsonwebtoken : used for jwt tokens for user authentication
- Migrate-mongo: used for creating template data for role collection and permission collection

### Installation

1. Clone the repository:
   git clone https://github.com/neelfrost19/healthx.api.git

2. Navigate to the project directory:
   cd healthx.api

3. Install the dependencies:
   npm install

### Configuration

1. Copy the example environment configuration file:
   cp .env.example .env

2. Edit the `.env` file with your configuration settings.

### Setting Up ENV

1. For port use any desired port.
   example: 3001

2. For DB_URL, create a cluster in mongo atlas or use the one provided.
   provided DB_URL = mongodb+srv://externalUser:HTuxpvFvL2FjMVh6@clusterfrost.kctonhr.mongodb.net/health_hosted

3. For ENCRYPTION_KEY, create a random byte of length 32 using crypto module and then convert it to hexadecimal.
   Use the following code: `crypto.randomBytes(32).toString('hex')` or use the following example without quotes:
   `52cca9110964d9009ca8fc69c3111a6e6e25d199ea90fc9136a9dde8ce08e6b6`

4. For SECRET_KEY, create a random byte of length 64 using crypto module and then convert it to hexadecimal.
   Use the following code: `crypto.randomBytes(64).toString('hex')` or use the following example without quotes:
   `509a1d3c175150ed74db8a729945ee2b5e0b8d540902456f9cdfb1e01b1b7221138e9c931abf4f4f651b5b342f41b97b9f72a5a73aeefb7902ef948bcd24f07d`

### Running the API

Start the server:
npm start
The API will be accessible at http://localhost:PORT where the port is provided from .env.

Project Structure
src/ - Contains the source code for the API
.env.example - Example environment configuration file
.gitignore - Specifies files to be ignored by Git
package.json - Project metadata and dependencies

### Using the provided APIs

Postman collection link: 


APIs:

1. createUser:
    - It's a POST request which takes userName, email, password to create a user
    - passwords aren't directly stored instead an encryption method is used to encrypt the password and then store
    - Request Body :
      {
      "userName": "Sonu Das",
      "email": "sonu.das851@gmail.com",
      "password": "NeelSonu1999*#"
      }

2. userLogin
    - It's a POST request which takes email and password to create an user accesstoken
    - password is encrypted using the above used encryption method and then compared to the stored encrypted password along with email.
    - Request Body :
      {
      "email": "sonu.das851@gmail.com",
      "password": "NeelSonu1999*#"
      }

3. createStaff
    - It's a Post request which takes an object containing all details of a staff remember.
    - 



### Commit and Push

- After commiting and pushing any changes to master branch through the following command
  `git push origin master`
  Github action is triggered which automatically builds a docker image.

- After the above github action is completed, deployment action is triggered.

- The above triggers a webhook from render to automatically deploy using the latest docker image.
	
