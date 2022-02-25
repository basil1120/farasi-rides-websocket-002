const server = require('http').createServer()
const io = require('socket.io')(server)

const userConnectionId = new Map();
const userLoginMap = new Map();

io.on('connection', function (client) {
    console.log('client connected...', client.id);
    const query = client.handshake.query;
    console.log(query);
  
    //LOGIN MAP
    userLoginMap.set(query.userId, client.id)
    userConnectionId.set(client.id, query.userId);

    io.emit('loginStatus', client.id);
  

    client.on('driverArrivedCommunicationSocket', function name(data){
      var responseData;
      responseData = {
        conversationId: data.conversationId,
        tripStatus: data.tripStatus,
        riderId: data.riderId,
        driverId: data.driverId
      };
      console.log(responseData);
        io.emit('driverArrivedCommunicationSocket', JSON.stringify(responseData));
    })

    client.on('driverStartedTripCommunicationSocket', function name(data){
      var responseData;
      responseData = {
        conversationId: data.conversationId,
        tripStatus: data.tripStatus,
        riderId: data.riderId,
        driverId: data.driverId
      };
      console.log(responseData);
        io.emit('driverStartedTripCommunicationSocket', JSON.stringify(responseData));
    })

    client.on('driverCanceledTripCommunicationSocket', function name(data){
      var responseData;
      responseData = {
        conversationId: data.conversationId,
        tripStatus: data.tripStatus,
        riderId: data.riderId,
        driverId: data.driverId
      };
      console.log(responseData);
        io.emit('driverCanceledTripCommunicationSocket', JSON.stringify(responseData));
    })

    client.on('driverCompletedTripCommunicationSocket', function name(data){
      var responseData;
      responseData = {
        conversationId: data.conversationId,
        tripStatus: data.tripStatus,
        riderId: data.riderId,
        driverId: data.driverId
      };
      console.log(responseData);
        io.emit('driverCompletedTripCommunicationSocket', JSON.stringify(responseData));
    })

    client.on('driverLocationBroadcastCommunicationSocket', function name(data){
      var responseData;
      responseData = {
        conversationId: data.conversationId,
        tripStatus: data.tripStatus,
        riderId: data.riderId,
        driverId: data.driverId
      };
      console.log(responseData);
        io.emit('driverLocationBroadcastCommunicationSocket', JSON.stringify(responseData));
    })

    // --- user communication ---- //
    client.on('customerCanceledTripCommunicationSocket', function name(data){
        var responseData;
        responseData = {
          conversationId: data.conversationId,
          tripStatus: data.tripStatus,
          riderId: data.riderId,
          driverId: data.driverId
        };
        console.log(responseData);
        io.emit('customerCanceledTripCommunicationSocket',  JSON.stringify(responseData));
    })


    client.on('disconnect', function () {
      console.log('client disconnect... ', client.id + ' ...... ')
      try {
      //get userID by connectionID
      var userID = userConnectionId.get(client.id);
       //remove userID from userLogin Map and Token Map
      userLoginMap.delete(userID);
      }
      catch (e) {
        console.log("entering catch block");
        console.log(e);
        console.log("leaving catch block");
      }
      finally {
        console.log("entering and leaving the finally block");
      }
    })

    client.on('error', function (err) {
      console.log('received error from client:', client.id)
      console.log(err)
    })
  })


var server_port = process.env.PORT || 30100;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});