import { Response } from 'express';
import { IResponse } from '../interfaces';

export const JsonResponse = (res: Response, body: IResponse) => {
  res.status(body.statusCode);
  res.send({
    statusCode: body.statusCode,
    status: body.status,
    title: body.title,
    message: body.message,
    data: body.data,
    pageData: body.pageData,
    extraData: body.extraData,
  });
};
