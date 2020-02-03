// package: greeting
// file: greeting.proto

import * as greeting_pb from "./greeting_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GreetingServicehello = {
  readonly methodName: string;
  readonly service: typeof GreetingService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof greeting_pb.Person;
  readonly responseType: typeof greeting_pb.Greeting;
};

type GreetingServicehelloServerSide = {
  readonly methodName: string;
  readonly service: typeof GreetingService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof greeting_pb.Person;
  readonly responseType: typeof greeting_pb.Greeting;
};

type GreetingServicehelloClientSide = {
  readonly methodName: string;
  readonly service: typeof GreetingService;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof greeting_pb.Person;
  readonly responseType: typeof greeting_pb.Greeting;
};

type GreetingServicehelloBidirectional = {
  readonly methodName: string;
  readonly service: typeof GreetingService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof greeting_pb.Person;
  readonly responseType: typeof greeting_pb.Greeting;
};

export class GreetingService {
  static readonly serviceName: string;
  static readonly hello: GreetingServicehello;
  static readonly helloServerSide: GreetingServicehelloServerSide;
  static readonly helloClientSide: GreetingServicehelloClientSide;
  static readonly helloBidirectional: GreetingServicehelloBidirectional;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class GreetingServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  hello(
    requestMessage: greeting_pb.Person,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: greeting_pb.Greeting|null) => void
  ): UnaryResponse;
  hello(
    requestMessage: greeting_pb.Person,
    callback: (error: ServiceError|null, responseMessage: greeting_pb.Greeting|null) => void
  ): UnaryResponse;
  helloServerSide(requestMessage: greeting_pb.Person, metadata?: grpc.Metadata): ResponseStream<greeting_pb.Greeting>;
  helloClientSide(metadata?: grpc.Metadata): RequestStream<greeting_pb.Person>;
  helloBidirectional(metadata?: grpc.Metadata): BidirectionalStream<greeting_pb.Person, greeting_pb.Greeting>;
}

