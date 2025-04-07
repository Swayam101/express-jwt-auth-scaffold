export enum ERoles {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export interface IResponse {
  statusCode: 200 | 400 | 500 | 401 | 404 | 201 | 204 | 429 | 403;
  status: 'success' | 'error';
  title: string;
  message: string;
  data?: any;
  extraData?: any;
  pageData?: any;
}
