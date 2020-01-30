/**
 * @fileoverview gRPC-Web generated client stub for greeting
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.greeting = require('./greeting_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.greeting.GreetingServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.greeting.GreetingServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.greeting.Person,
 *   !proto.greeting.Greeting>}
 */
const methodInfo_GreetingService_hello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.greeting.Greeting,
  /** @param {!proto.greeting.Person} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.greeting.Greeting.deserializeBinary
);


/**
 * @param {!proto.greeting.Person} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.greeting.Greeting)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.greeting.Greeting>|undefined}
 *     The XHR Node Readable Stream
 */
proto.greeting.GreetingServiceClient.prototype.hello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/greeting.GreetingService/hello',
      request,
      metadata || {},
      methodInfo_GreetingService_hello,
      callback);
};


/**
 * @param {!proto.greeting.Person} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.greeting.Greeting>}
 *     A native promise that resolves to the response
 */
proto.greeting.GreetingServicePromiseClient.prototype.hello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/greeting.GreetingService/hello',
      request,
      metadata || {},
      methodInfo_GreetingService_hello);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.greeting.Empty,
 *   !proto.greeting.Greeting>}
 */
const methodInfo_GreetingService_helloServerSide = new grpc.web.AbstractClientBase.MethodInfo(
  proto.greeting.Greeting,
  /** @param {!proto.greeting.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.greeting.Greeting.deserializeBinary
);


/**
 * @param {!proto.greeting.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.greeting.Greeting>}
 *     The XHR Node Readable Stream
 */
proto.greeting.GreetingServiceClient.prototype.helloServerSide =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/greeting.GreetingService/helloServerSide',
      request,
      metadata || {},
      methodInfo_GreetingService_helloServerSide);
};


/**
 * @param {!proto.greeting.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.greeting.Greeting>}
 *     The XHR Node Readable Stream
 */
proto.greeting.GreetingServicePromiseClient.prototype.helloServerSide =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/greeting.GreetingService/helloServerSide',
      request,
      metadata || {},
      methodInfo_GreetingService_helloServerSide);
};


module.exports = proto.greeting;

