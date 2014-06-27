# Database Project

Provides an Rest API for data access

#### Api 

```shell
http://localhost:9000/database/collectionName
```

+ POST   [ Insert Data   ]
+ PUT    [ Update Data   ]
+ DELETE [ Delete Data   ]
+ FIND   [ Retrieve Data ]

+ FindById  GET  http://localhost:9000/database/collectionName/ID
+ Find -> GET http://localhost:9000/database/collectionName
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
