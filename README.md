# Nodejs Mysql react js docker
-----------------------
A second-level headings

### How to run Nodejs Mysql react js docker Web Application locally

```
Git clone https://github.com/mankarsandesh/nodejs-mysql-reactjs-docker
cd server 
npm install
```
### Docker setup
This will skip both images for mysql and phpmyadmin, and will build the images for client and server.
```
docker-compose build   
```
Now that the images are ready, run **docker-compose up -d** to start the four images in detached mode:
``` 
docker-compose up -d   
```
To check which containers are running:

```
docker ps
```
