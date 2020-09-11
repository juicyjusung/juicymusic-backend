export interface ResponseBody {
  httpStatus: number;
  status: string;
  responseData?: any;
  errorDetails?: Error;
  message?: string;
}
