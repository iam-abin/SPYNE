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

- To build images and run services,
In the root directory run 

```
docker-compose up --build
```

- To Ensure All Services Are Running ( user, discussion, mongodb, nginx_proxy )

```
docker ps
```

- To access the user service, enter the following in the browser or postman

```
http://localhost:8080/api/v1/user/<other path>
```

- To access the discussion service,

```
http://localhost:8080/api/v1/post/<other path>
```