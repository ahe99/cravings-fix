interface ResponseMessage {
  400: string
  401: string
  403: string
  404: string
  408: string
  409: string
  500: string
}
const responseMessage: ResponseMessage = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  409: 'Conflict',
  500: 'Internal Server Error',
}

class ErrorWithStatus {
  name: string
  message: string
  statusCode: number
  constructor(statusCode: keyof ResponseMessage, message: string) {
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || responseMessage[statusCode]
    this.statusCode = statusCode
  }
}
class ClientError extends ErrorWithStatus {}
class ServerError extends ErrorWithStatus {
  constructor(message = responseMessage[500]) {
    super(500, message)
  }
}

class ServiceError extends ServerError {}
class MiddlewareError extends ServiceError {}
class RoleError extends ServiceError {}
class GroupError extends ServiceError {}
class UserError extends ServiceError {}
class DatabaseError extends ServiceError {}
class RedisError extends ServiceError {}
class MailError extends ServiceError {}
class AuthError extends ServiceError {}
class FileValidationError extends ServiceError {}
class WorkOrderError extends ServiceError {}
class KanbanError extends ServiceError {}
class ProductStationError extends ServiceError {}
class WorkOrderStationError extends ServiceError {}
class KanbanRecordError extends ServiceError {}

export {
  responseMessage,
  ErrorWithStatus,
  ClientError,
  ServerError,
  ServiceError,
  MiddlewareError,
  RoleError,
  GroupError,
  UserError,
  DatabaseError,
  RedisError,
  MailError,
  AuthError,
  FileValidationError,
  WorkOrderError,
  KanbanError,
  ProductStationError,
  WorkOrderStationError,
  KanbanRecordError,
}
