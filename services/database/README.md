# Database Project

Provides an Rest API for data access

[example] 
http://localhost:9000/database/collectionName

1. POST -> Insert Data
2. PUT  -> Update Data
3. DELETE -> Delete Data

4. FindById -> GET  http://localhost:9000/database/collectionName/ID

5. Find -> GET http://localhost:9000/database/collectionName

{
	conditions:{ 
		"_id":"1234",
		"name":"tlantic"
	},
	fields:"name address",
	options:{}
}

