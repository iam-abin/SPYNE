# SPYNE
Backend application with some social media functionalities.

### Prerequisites

Make sure you have the following installed on your system:

-   Node.js
-   mongodb
-   docker
-   docker-compose

## Setup

1. Clone the repository

```
git clone https://github.com/iam-abin/SPYNE.git
```

2. Navigate to the project directory

```
cd SPYNE
```
3. Change .env.example to .env 

- To build images and run services,
In the root directory run 

```
docker-compose up --build
```

- To Ensure All Services Are Running ( user, discussion, mongodb, nginx_proxy )

```
docker ps
```

- To access the user service, enter the following in the postman

```
http://localhost:8080/api/v1/user/<other path>
```

- To access the discussion service,

```
http://localhost:8080/api/v1/post/<other path>
```

### LLD
---

[LLD](https://drive.google.com/file/d/1WYV1ie-KXL3hBC-8IIDrzGUOQdUUWj5X/view?usp=sharing)

### POSTMAN COLLECTION
---

[collection](https://drive.google.com/file/d/1NBQoKRvAKq-dpStouXGzQQZ-t8IHqCJC/view?usp=sharing)
