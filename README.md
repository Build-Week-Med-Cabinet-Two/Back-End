# Back-End

## Schema

#### Users

| Field     | Effect  | Notes                              |
| --------- | ------- | ---------------------------------- |
| id        | integer | _primary key_ and _autoincrements_ |
| username  | string  | _required_ and _unique_            |
| email     | string  | _required_                         |
| password  | string  | _required_                         |
| zipcode   | integer | _optional_                         |
| birthDate | date    | _optional_                         |

#### Intakes

| Field  | Effect  | Notes                              |
| ------ | ------- | ---------------------------------- |
| id     | integer | _primary key_ and _autoincrements_ |
| intake | string  | _required_ and _unique_            |

AVAILABLE INTAKES:
"Vape",
"Edible",
"Smoke",
"Topical"

#### Types

| Field | Effect  | Notes                              |
| ----- | ------- | ---------------------------------- |
| id    | integer | _primary key_ and _autoincrements_ |
| type  | string  | _required_ and _unique_            |

AVAILABLE TYPES:
"Indica",
"Sativa",
"Hybrid"

#### Lists

| Field    | Effect  | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| user_id  | string  | _required_                         |
| listName | string  | _required_                         |
| issues   | string  | _optional_                         |
| strain   | string  | _optional_                         |
| effect   | string  | _optional_                         |
| flavor   | string  | _optional_                         |

#### List_Intakes

| Field     | Effect  | Notes                        |
| --------- | ------- | ---------------------------- |
| intake_id | integer | _required_ and _primary key_ |
| list_id   | string  | _required_ and _primary key_ |

#### List_Types

| Field   | Effect  | Notes                        |
| ------- | ------- | ---------------------------- |
| type_id | integer | _required_ and _primary key_ |
| list_id | integer | _required_ and _primary key_ |

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

| Effect   | Path                    | Notes                  |
| -------- | ----------------------- | ---------------------- |
| POST     | `/auth/register`        | register a new user    |
| POST     | `/auth/login`           | login an existing user |
| DELETE\* | `/auth/delete-user`     | remove user - NO UNDO  |
| PUT\*    | `/auth/change-password` | change password        |
| GET\*    | `/users/lists`          | array of user lists    |
| GET\*    | `/users/list/:listName` | view recommendations   |
| POST\*   | `/users/add-list`       | create new list        |
| PUT\*    | `/users/update-list`    | create new list        |
| DELETE\* | `/users/delete-list`    | delete list            |

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
  "password": "password",
  "zipcode": "90210",
  "birthDate": 
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

#### DELETE /auth/delete-user

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

#### GET /users/lists

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json

  {
    "listName": "Sleepy Time Tea",
    "issues": "Goodnight Ya'll",
    "strain": "Girl Scout Cookies",
    "effect": "sweet dreams",
    "flavor": "hot cocoa"
  },
  {
    "listName": "Sour Puss",
    "issues": "bad mood",
    "strain": "gorilla glue",
    "effect": "head high",
    "flavor": "Smoke"
  }
]
```

#### GET /users/list/:listName

(include auth token in headers)
request data:

```json
{
  "headers": { "authorization": "bearer really.long.token" }
}
```

response data:

```json
{
  "results": [
    {
      "Description": "Purple Cream has been a favorite of anxiety sufferers for over a decade. Great for nighttime use, this indica is mellow and calming. Purple Cream produces a moderate body-heavy sensation, relaxing your muscles and easing stress. The effects of this strain are quite sedative and can last around two hours. Like other purples, Purple Cream’s aroma is sweet, floral, and earthy.",
      "Effects": "Happy,Relaxed,Sleepy,Hungry,Giggly",
      "Flavor": "Sweet,Pine,Earthy",
      "Rating": 4.3,
      "Strain": "Purple-Cream",
      "Type": "indica"
    },
    {
      "Description": "Cornbread by Rare Dankness is an 80/20 indica-dominant hybrid strain that crosses Katsu Bubba Kush and Rare Dankness #2. Its aroma is a sweet mix of lemons and incense, and like a perfect appetizer, Cornbread is all you’ll need to invite the appetite before dinner. With heavy, tranquilizing effects that relax the body, Cornbread also makes a great nightcap as you transition into sleep.",
      "Effects": "Relaxed,Euphoric,Hungry,Happy,Sleepy",
      "Flavor": "Lemon,Citrus,Woody",
      "Rating": 4.6,
      "Strain": "Cornbread",
      "Type": "indica"
    },
    {
      "Description": "Harry Potter is an otherworldly hybrid strain that crosses Blissful Wizard with Fire Alien Kush. Bred by Sasquatch Gardens in California, Harry Potter casts a pacifying spell over the body, easing aches and pains while hushing anxiety. ",
      "Effects": "Relaxed,Happy,Uplifted,Creative,Giggly",
      "Flavor": "Sweet,Citrus,Lemon",
      "Rating": 4.8,
      "Strain": "Harry-Potter",
      "Type": "hybrid"
    }
  ]
}
```

#### POST users/add-list

request data:

```json
{
  "listName": "Sleepy",
  "intakes": ["Smoke", "Vape"],
  "types": ["Hybrid"],
  "issues": "optional user inputed issue(s)",
  "strain": "optional user inputed strain(s)",
  "effect": "optional user inputed effect(s)",
  "flavor": "optional user inputed flavor(s)"
}
```

response data:

```json
[
  {
    "message": " user just CREATED list: Sleepy",
    "results": [
      {
        "Description": "Purple Cream has been a favorite of anxiety sufferers for over a decade. Great for nighttime use, this indica is mellow and calming. Purple Cream produces a moderate body-heavy sensation, relaxing your muscles and easing stress. The effects of this strain are quite sedative and can last around two hours. Like other purples, Purple Cream’s aroma is sweet, floral, and earthy.",
        "Effects": "Happy,Relaxed,Sleepy,Hungry,Giggly",
        "Flavor": "Sweet,Pine,Earthy",
        "Rating": 4.3,
        "Strain": "Purple-Cream",
        "Type": "indica"
      },
      {
        "Description": "Cornbread by Rare Dankness is an 80/20 indica-dominant hybrid strain that crosses Katsu Bubba Kush and Rare Dankness #2. Its aroma is a sweet mix of lemons and incense, and like a perfect appetizer, Cornbread is all you’ll need to invite the appetite before dinner. With heavy, tranquilizing effects that relax the body, Cornbread also makes a great nightcap as you transition into sleep.",
        "Effects": "Relaxed,Euphoric,Hungry,Happy,Sleepy",
        "Flavor": "Lemon,Citrus,Woody",
        "Rating": 4.6,
        "Strain": "Cornbread",
        "Type": "indica"
      },
      {
        "Description": "Harry Potter is an otherworldly hybrid strain that crosses Blissful Wizard with Fire Alien Kush. Bred by Sasquatch Gardens in California, Harry Potter casts a pacifying spell over the body, easing aches and pains while hushing anxiety. ",
        "Effects": "Relaxed,Happy,Uplifted,Creative,Giggly",
        "Flavor": "Sweet,Citrus,Lemon",
        "Rating": 4.8,
        "Strain": "Harry-Potter",
        "Type": "hybrid"
      }
    ]
  }
]
```

#### PUT /users/update-list

(include auth token in headers)
request data:

```json
{
  "oldListName": "Sleepy",
  "listName": "SleepyOne",
  "intakes": ["Smoke", "Vape"],
  "types": ["Indica"],
  "issues": "optional user inputed issue(s)",
  "strain": "optional user inputed strain(s)",
  "effect": "optional user inputed effect(s)",
  "flavor": "optional user inputed flavor(s)"
}
```

response data:

```json
{
  "message": "user1 just UPDATED list: SleepyOne",
  "results": [
    {
      "Description": "Purple Cream has been a favorite of anxiety sufferers for over a decade. Great for nighttime use, this indica is mellow and calming. Purple Cream produces a moderate body-heavy sensation, relaxing your muscles and easing stress. The effects of this strain are quite sedative and can last around two hours. Like other purples, Purple Cream’s aroma is sweet, floral, and earthy.",
      "Effects": "Happy,Relaxed,Sleepy,Hungry,Giggly",
      "Flavor": "Sweet,Pine,Earthy",
      "Rating": 4.3,
      "Strain": "Purple-Cream",
      "Type": "indica"
    },
    {
      "Description": "Cornbread by Rare Dankness is an 80/20 indica-dominant hybrid strain that crosses Katsu Bubba Kush and Rare Dankness #2. Its aroma is a sweet mix of lemons and incense, and like a perfect appetizer, Cornbread is all you’ll need to invite the appetite before dinner. With heavy, tranquilizing effects that relax the body, Cornbread also makes a great nightcap as you transition into sleep.",
      "Effects": "Relaxed,Euphoric,Hungry,Happy,Sleepy",
      "Flavor": "Lemon,Citrus,Woody",
      "Rating": 4.6,
      "Strain": "Cornbread",
      "Type": "indica"
    },
    {
      "Description": "Harry Potter is an otherworldly hybrid strain that crosses Blissful Wizard with Fire Alien Kush. Bred by Sasquatch Gardens in California, Harry Potter casts a pacifying spell over the body, easing aches and pains while hushing anxiety. ",
      "Effects": "Relaxed,Happy,Uplifted,Creative,Giggly",
      "Flavor": "Sweet,Citrus,Lemon",
      "Rating": 4.8,
      "Strain": "Harry-Potter",
      "Type": "hybrid"
    }
  ]
}
```

#### DELETE /users/delete-list

(include auth token in headers)
request data:

```json
{
  "listName": "programatically provide the list name here (Just the raw string)"
}
```

response data:

```json
{
  "message": "List successfully deleted"
}
```
