# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username" : "gilang",
  "password" : "rahasia",
  "name" : "Gilang Palito"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "gilang",
    "name" : "Gilang Palito"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username" : "gilang",
  "password" : "rahasia"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "gilang",
    "name" : "Gilang Palito",
    "token" : "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : {
    "username" : "gilang",
    "name" : "Gilang Palito"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "password" : "rahasia", // tidak wajib
  "name" : "Gilang Palito" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "gilang",
    "name" : "Gilang Palito"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```
