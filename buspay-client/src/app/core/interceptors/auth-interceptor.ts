import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  console.log('Interceptor : ', req);
  const accessToken = localStorage.getItem('accessToken');
  const token_type = 'Bearer';
  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', `${token_type}` + accessToken).set('app-type', 'super_admin'),
    
  });
  return next(clonedRequest);
};
