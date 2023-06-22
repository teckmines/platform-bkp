# add mongodb uri fo connection
export MONGODB_URL="mongodb://localhost:27017/services?retryWrites=true&w=majority"
# add service port 
export PORT=2468
# JWT secret key
export JWT_SECRET_KEY=jwtkey10pmlasp
# JWT time out - expressed in seconds or a string describing a time span zeit/ms.
export JWT_TIMEOUT=18000000

node src/index.js
