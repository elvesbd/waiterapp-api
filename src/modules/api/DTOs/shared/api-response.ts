export class ApiResponse<T> {
  data: T | T[] | undefined;
  status: number;
  message: string;

  constructor(data: T | T[] | undefined, status: number, message: string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}
