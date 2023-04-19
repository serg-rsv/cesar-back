# cesar-back
Backend for managing encrypted messages.

## Config
Create a file in `src/config/.env`. Set the next vriables befor start
```env
# Postgres Database
DB_URI=postgres://user:password@host:port/database

# JWT
ACCESS_TOKEN_SECRET=your_jwt_access_secret_key

# Server
PORT=5000
```

## Usage
Install
```sh
npm i
```
Run
```sh
npm run server
```
## Documentation
You can get more information about the API by visiting [`/api-docs`](http://localhost:5000/api-docs) after starting this server or use this [link](https://cesar-ws.onrender.com/api-docs/)
