# Database Project

Provides an Rest API for data access

#### Api 

```shell
http://localhost:9000/database/collectionName
```

+ POST   for Insert Data   
+ PUT    for Update Data 
+ DELETE for Delete Data   

Retrieve Data

+ FindById  GET  http://localhost:9000/database/collectionName/ID
+ Find  POST http://localhost:9000/database/collectionName
```json
{
	"conditions":{ 
		"_id":"1234",
		"name":"tlantic"
	},
	"fields":"name address",
	"options":{}
}
```
