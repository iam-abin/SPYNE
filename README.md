SPYNE

- To build images and run services,
In the root directory run 

```
docker-compose up --build
```

- To access the user service, enter the following in the browser or postman

```
http://localhost:8080/api/v1/user/<other path>
```

- To access the discussion service,

```
http://localhost:8080/api/v1/discussion/<other path>
```