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

BASE URL: https://medcabinet2.herokuapp.com/

test account:

```json
{
  "username": "user1",
  "password": "password",
  "email": "user1@email.com"
}
```

#### Table of Contents

| Type     | Path                    | Notes                  |
| -------- | ----------------------- | ---------------------- |
| POST     | `/auth/register`        | register a new user    |
| POST     | `/auth/login`           | login an existing user |
| DELETE\* | `/auth/delete-user`     | remove user - NO UNDO  |
| PUT\*    | `/auth/change-password` | change password        |
| GET\*    | `/users`                | list array of users    |
| GET\*    | `/users/:id`            | list info for user     |

\*(include auth token in headers)

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

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
  "message": "Welcome to med-cabinet ${user}",
  "token": "really.long.token"
}
```

### DELETE /auth/delete-user

response data:

```json
{
  "message": "${user} Deleted",
  "removed": "User Profile Permanently Deleted"
}
```

#### PUT /auth/change-password

request data:

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

