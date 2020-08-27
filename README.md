# Back-End

## Schema

#### Users

| Field     | Type    | Notes                              |
| --------- | ------- | ---------------------------------- |
| id        | integer | _primary key_ and _autoincrements_ |
| username  | string  | _required_ and _unique_            |
| email     | string  | _required_                         |
| password  | string  | _required_                         |
| zipcode   | integer | _optional_                         |
| birthDate | date    | _optional_                         |

#### Flavors

| Field  | Type    | Notes                              |
| ------ | ------- | ---------------------------------- |
| id     | integer | _primary key_ and _autoincrements_ |
| flavor | string  | _required_ and _unique_            |

AVAILABLE FLAVORS:
    "Earthy",
    "Sweet",
    "Citrus",
    "Flowery",
    "Violet",
    "Diesel",
    "Spicy/Herbal",
    "Sage",
    "Woody",
    "Apricot",
    "Grapefruit",
    "Orange",
    "None",
    "Pungent",
    "Grape",
    "Pine",
    "Skunk",
    "Berry",
    "Pepper",
    "Menthol",
    "Blue Cheese",
    "Cheese",
    "Chemical",
    "Mango",
    "Lemon",
    "Peach",
    "Vanilla",
    "Nutty",
    "Chestnut",
    "Tea",
    "Tobacco",
    "Tropical",
    "Strawberry",
    "Blueberry",
    "Mint",
    "Apple",
    "Honey",
    "Lavender",
    "Lime",
    "Coffee",
    "Ammonia",
    "Minty",
    "Tree",
    "Fruit",
    "Butter",
    "Pineapple",
    "Tar",
    "Rose",
    "Plum",
    "Pear"


#### Effects

| Field  | Type    | Notes                              |
| ------ | ------- | ---------------------------------- |
| id     | integer | _primary key_ and _autoincrements_ |
| effect | string  | _required_ and _unique_            |

AVAILABLE EFFECTS:
    "Creative",
    "Energetic",
    "Tingly",
    "Euphoric",
    "Relaxed",
    "Aroused",
    "Happy",
    "Uplifted",
    "Hungry",
    "Talkative",
    "None",
    "Giggly",
    "Focused",
    "Sleepy",
    "Dry Mouth"

#### Lists

| Field       | Type    | Notes                              |
| ----------- | ------- | ---------------------------------- |
| id          | integer | _primary key_ and _autoincrements_ |
| user_id     | string  | _required_                         |
| listName    | string  | _required_                         |
| issues      | string  | _optional_                         |
| strain      | string  | _optional_                         |
| type        | string  | _optional_                         |
| intake      | string  | _optional_

#### List_Flavors

| Field     | Type    | Notes                          |
| --------- | ------- | ------------------------------ |
| flavor_id | integer | \_required\* and _primary key_ |
| list_id   | string  | \_required\* and _primary key_ |

#### List_Effects

| Field     | Type    | Notes                        |
| --------- | ------- | ---------------------------- |
| effect_id | integer | _required_ and _primary key_ |
| list_id   | integer | _required_ and _primary key_ |

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
| GET\*    | `/users/lists`          | array of user lists    |
| GET\*    | `/users/list/:listName` | view recommendations   |
| POST\*   | `/users/add-list`       | create new list        |
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
[
  {
    "listName": "Couch Lock",
    "issues": "Something to wind down"
  },
  {
    "listName": "Creative",
    "issues": "Get creative juices flowing"
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
[
    "results": [
        {
            "Description": "Qush is a 70/30 indica-dominant cannabis strain from TGA Genetics, who combines Pre-98 Bubba Kush with Space Queen. Bred for potency as well as flavor, Qush’s resin-packed buds radiate with sweet aromas of grape, cherry, and hashy spice. This tranquilizing strain has a way of calming worries and upset stomachs, but keep in mind that Qush can have a sedating, cloudy effect on the mind so consider saving this one for evenings and lazy days.",
            "Effects": "Relaxed,Sleepy,Uplifted,Happy,Euphoric",
            "Flavor": "Flowery,Citrus,Pungent",
            "Rating": 4.5,
            "Strain": "Qush",
            "Type": "indica"
        },
        {
            "Description": "Another member of the “planetary series,” Venus OG is a hybrid strain bearing OG Kush heritage, although its specific parent strains are disputed. Each glistening trichome carries a resemblance to the bright planet this strain is named after, coating its conic buds in a galactic blanket of white crystals. A fresh pine aroma mixed with sour notes of lemon draws you in, and next comes the heavy euphoria to take away your sense of gravity and lift you to a happy, relaxed place.",
            "Effects": "Focused,Tingly,Happy,Uplifted,Creative",
            "Flavor": "Citrus,Lemon,Berry",
            "Rating": 4.8,
            "Strain": "Venus-Og",
            "Type": "hybrid"
        },
        {
            "Description": "King Kong, mothered by Ed Rosenthal Super Bud, is an indica-dominant hybrid with head-to-toe effects as strong as the giant ape himself. These dense conic buds come frosted in crystals and ribboned in hairs despite its short flowering time of only 7 to 8 weeks. King Kong is known to have a pungent sour, skunky smell with long-lasting effects that target pain, nausea, anxiety, and the appetite. Even though its genetics tip toward the indica side, King Kong has an uplifting and focused effect enjoyed by indica and sativa lovers alike.",
            "Effects": "Happy,Focused,Giggly,Relaxed,Uplifted",
            "Flavor": "Earthy,Flowery,Pungent",
            "Rating": 4.2,
            "Strain": "King-Kong",
            "Type": "hybrid"
        }
    ]
]
```

#### POST users/add-list

request data:

```json
{
  "listName": "Sleepy",
  "description": "Optional user-provided description",
  "flavors": ["Earthy", "Coffee"],
  "effects": ["Happy", "Relaxed"]
}
```

response data:

```json
{
  {
  "message": " user just CREATED list: Sleepy",
  "results": [
        {
            "Description": "Qush is a 70/30 indica-dominant cannabis strain from TGA Genetics, who combines Pre-98 Bubba Kush with Space Queen. Bred for potency as well as flavor, Qush’s resin-packed buds radiate with sweet aromas of grape, cherry, and hashy spice. This tranquilizing strain has a way of calming worries and upset stomachs, but keep in mind that Qush can have a sedating, cloudy effect on the mind so consider saving this one for evenings and lazy days.",
            "Effects": "Relaxed,Sleepy,Uplifted,Happy,Euphoric",
            "Flavor": "Flowery,Citrus,Pungent",
            "Rating": 4.5,
            "Strain": "Qush",
            "Type": "indica"
        },
        {
            "Description": "Another member of the “planetary series,” Venus OG is a hybrid strain bearing OG Kush heritage, although its specific parent strains are disputed. Each glistening trichome carries a resemblance to the bright planet this strain is named after, coating its conic buds in a galactic blanket of white crystals. A fresh pine aroma mixed with sour notes of lemon draws you in, and next comes the heavy euphoria to take away your sense of gravity and lift you to a happy, relaxed place.",
            "Effects": "Focused,Tingly,Happy,Uplifted,Creative",
            "Flavor": "Citrus,Lemon,Berry",
            "Rating": 4.8,
            "Strain": "Venus-Og",
            "Type": "hybrid"
        },
        {
            "Description": "King Kong, mothered by Ed Rosenthal Super Bud, is an indica-dominant hybrid with head-to-toe effects as strong as the giant ape himself. These dense conic buds come frosted in crystals and ribboned in hairs despite its short flowering time of only 7 to 8 weeks. King Kong is known to have a pungent sour, skunky smell with long-lasting effects that target pain, nausea, anxiety, and the appetite. Even though its genetics tip toward the indica side, King Kong has an uplifting and focused effect enjoyed by indica and sativa lovers alike.",
            "Effects": "Happy,Focused,Giggly,Relaxed,Uplifted",
            "Flavor": "Earthy,Flowery,Pungent",
            "Rating": 4.2,
            "Strain": "King-Kong",
            "Type": "hybrid"
        }
    ]
}
```

#### PUT /users/update-list

(include auth token in headers)
request data:

```json
{
  "oldListName": "Sleepy",
  "listName": "SleepyOne",
  "flavors": ["Apple", "Coffee"],
  "effects": ["Happy", "Uplifted"],
  "description": "Optional user-provided description"
}
```

response data:

```json
{
  "message": "user1 just UPDATED list: SleepyOne",
  "results": [
    {
      "Description": "Qush is a 70/30 indica-dominant cannabis strain from TGA Genetics, who combines Pre-98 Bubba Kush with Space Queen. Bred for potency as well as flavor, Qush’s resin-packed buds radiate with sweet aromas of grape, cherry, and hashy spice. This tranquilizing strain has a way of calming worries and upset stomachs, but keep in mind that Qush can have a sedating, cloudy effect on the mind so consider saving this one for evenings and lazy days.",
      "Effects": "Relaxed,Sleepy,Uplifted,Happy,Euphoric",
      "Flavor": "Flowery,Citrus,Pungent",
      "Rating": 4.5,
      "Strain": "Qush",
      "Type": "indica"
    },
    {
      "Description": "Another member of the “planetary series,” Venus OG is a hybrid strain bearing OG Kush heritage, although its specific parent strains are disputed. Each glistening trichome carries a resemblance to the bright planet this strain is named after, coating its conic buds in a galactic blanket of white crystals. A fresh pine aroma mixed with sour notes of lemon draws you in, and next comes the heavy euphoria to take away your sense of gravity and lift you to a happy, relaxed place.",
      "Effects": "Focused,Tingly,Happy,Uplifted,Creative",
      "Flavor": "Citrus,Lemon,Berry",
      "Rating": 4.8,
      "Strain": "Venus-Og",
      "Type": "hybrid"
    },
    {
      "Description": "King Kong, mothered by Ed Rosenthal Super Bud, is an indica-dominant hybrid with head-to-toe effects as strong as the giant ape himself. These dense conic buds come frosted in crystals and ribboned in hairs despite its short flowering time of only 7 to 8 weeks. King Kong is known to have a pungent sour, skunky smell with long-lasting effects that target pain, nausea, anxiety, and the appetite. Even though its genetics tip toward the indica side, King Kong has an uplifting and focused effect enjoyed by indica and sativa lovers alike.",
      "Effects": "Happy,Focused,Giggly,Relaxed,Uplifted",
      "Flavor": "Earthy,Flowery,Pungent",
      "Rating": 4.2,
      "Strain": "King-Kong",
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
