// package: greeting
// file: greeting.proto

var greeting_pb = require("./greeting_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GreetingService = (function () {
  function GreetingService() {}
  GreetingService.serviceName = "greeting.GreetingService";
  return GreetingService;
}());

GreetingService.hello = {
  methodName: "hello",
  service: GreetingService,
  requestStream: false,
  responseStream: false,
  requestType: greeting_pb.Person,
  responseType: greeting_pb.Greeting
};

GreetingService.helloServerSide = {
  methodName: "helloServerSide",
  service: GreetingService,
  requestStream: false,
  responseStream: true,
  requestType: greeting_pb.Person,
  responseType: greeting_pb.Greeting
};

GreetingService.helloClientSide = {
  methodName: "helloClientSide",
  service: GreetingService,
  requestStream: true,
  responseStream: false,
  requestType: greeting_pb.Person,
  responseType: greeting_pb.Greeting
};

GreetingService.helloBidirectional = {
  methodName: "helloBidirectional",
  service: GreetingService,
  requestStream: true,
  responseStream: true,
  requestType: greeting_pb.Person,
  responseType: greeting_pb.Greeting
};

exports.GreetingService = GreetingService;

function GreetingServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GreetingServiceClient.prototype.hello = function hello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GreetingService.hello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GreetingServiceClient.prototype.helloServerSide = function helloServerSide(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(GreetingService.helloServerSide, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GreetingServiceClient.prototype.helloClientSide = function helloClientSide(metadata) {
  var listeners = {
    end: [],
    status: []
  };
  var client = grpc.client(GreetingService.helloClientSide, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.end.forEach(function (handler) {
      handler();
    });
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      if (!client.started) {
        client.start(metadata);
      }
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

GreetingServiceClient.prototype.helloBidirectional = function helloBidirectional(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(GreetingService.helloBidirectional, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.end.forEach(function (handler) {
      handler();
    });
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.GreetingServiceClient = GreetingServiceClient;

