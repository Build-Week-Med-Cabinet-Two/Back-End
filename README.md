# Back-End

## Schema

#### Users

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_                         |
| password | string  | _required_                         |
| username | string  | _required_ and _unique_            |

## API

BASE URL: ***heroku url***

#### Table of Contents

| Type   | Path                                 | Notes                                       |
| ------ | ------------------------------------ | ------------------------------------------- |
| POST   | `/auth/register`                     | register a new user                         |
| POST   | `/auth/login`                        | login an existing user                      |
**Temporary endpoints will be removed
| GET    | `/users`                             | list array of users MUST BE LOGGED IN       |
| GET    | `/users/:id`                         | list info for user MUST BE LOGGED IN        |