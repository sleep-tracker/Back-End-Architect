### **Add Sleep Data**
*method url*: `/api/users/data/add`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type    | required | description              |
| -------------- | ------- | -------- | ------------------------ |
| `sleepDate`    | String  |    Yes   |                          |
| `wakeDate`     | String  |    Yes   |                          |
| `sleepTime`    | String  |    Yes   |                          |
| `wakeTime`     | String  |    Yes   |                          |
| `moodBefore`   | Integer |    Yes   |                          |
| `moodAfter`    | Integer |    Yes   |                          |
| `moodDuring`   | Integer |    Yes   |                          |

#### Example

```
  {
    "sleepDate": "04-22-2019",
	"wakeDate": "04-23-2019",
	"sleepTime": "11:15 pm",
	"wakeTime": "08:20 am",
	"moodBefore": 2,
	"moodAfter": 4,
	"moodDuring": 3
  }
  ```

 #### Response
##### 200 (ok)
###### Example Response

```
{
    "message": "Data ID is 5"
}
```



### **Delete Sleep Data**
*method url*: `/api/users/data/delete/:id`

*http method*: **[DELETE]**


#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |


#### Response
##### 200 (ok)
###### Example Response

```
{
    "message": "Data ID is 5"
}
```

##### 404 (not found)
###### Example Response

```
{
    "message": "Data Entry with the specified ID of 3 does not exist."
}
```

### **Update Data**
*method url*: `/api/users/data/edit/:id`

*http method*: **[PATCH]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Response
##### 200 (ok)
###### Example Response

```
{
    "message": "Success! You updated 1 item(s)"
}
```

#### 404 (not found)
###### Example Response

```
{
    "message": "Data Entry with the specified ID of 3 does not exist."
}
```



### **Get Average Sleep Data**
*method url*: `/api/users/average`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize user  |

#### Response
##### 200 (ok)
###### Example Response

```
{
    bestSleep: "Your Optimal Sleep is 9 hrs"
}
```


### **Get Average Sleep Data**
*method url*: `/api/users/chart/data`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize user  |

#### Response
##### 200 (ok)
###### Example Response

```
{
   {
    "id": 10,
    "user_id": 3,
    "sleepDate": "1",
    "wakeDate": "1",
    "sleepTime": "01:15 am",
    "wakeTime": "08:20 am",
    "moodBefore": 1,
    "moodAfter": 1,
    "moodDuring": 1
  },
  {
    "id": 9,
    "user_id": 3,
    "sleepDate": "1",
    "wakeDate": "1",
    "sleepTime": "01:15 am",
    "wakeTime": "08:20 am",
    "moodBefore": 1,
    "moodAfter": 2,
    "moodDuring": 1
  },
  {
    "id": 8,
    "user_id": 3,
    "sleepDate": "1",
    "wakeDate": "1",
    "sleepTime": "01:15 am",
    "wakeTime": "08:20 am",
    "moodBefore": 1,
    "moodAfter": 3,
    "moodDuring": 1
  },
  {
    "id": 7,
    "user_id": 3,
    "sleepDate": "1",
    "wakeDate": "1",
    "sleepTime": "01:15 am",
    "wakeTime": "08:20 am",
    "moodBefore": 1,
    "moodAfter": 3,
    "moodDuring": 2
  }
}
```

