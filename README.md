# Back-End

## Schema

#### Users

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| username | string  | _required_ and _unique_            |
| email    | string  | _required_                         |
| password | string  | _required_                         |

## API

BASE URL: **_heroku url_**

#### Table of Contents

| Type | Path                    | Notes                  |
| ---- | ----------------------- | ---------------------- |
| POST | `/auth/register`        | register a new user    |
| POST | `/auth/login`           | login an existing user |
| PUT  | `/auth/change-password` | change password        |

\*\*Temporary endpoints for testing login
| GET | `/users` | list array of users MUST BE LOGGED IN |
| GET | `/users/:id` | list info for user MUST BE LOGGED IN |

## Examples

#### POST /auth/register

request data:

```json
{
  "username": "Name",
  "email": "username@email.com",
  "password": "password"
}
```

response data:

```json
{
  "message": "Registration successful",
  "user": {
    "email": "username@email.com",
    "username": "Name"
  },
  "token": "really.long.token"
}
```

#### POST /auth/login

request data:

```json
{
  "username": "Name",
  "password": "password"
}
```

response data:

```json
{
  "message": "Welcome to our API Name",
  "token": "really.long.token"
}
```

#### PUT /auth/change-password

(include auth token in headers)
request data:
```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

```json
{
  "password": "newPassword"
}
```

response data:

```json
{
  "message": "Password changed for ${user}"
}
```
