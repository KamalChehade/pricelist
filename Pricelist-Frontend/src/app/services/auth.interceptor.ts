// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Add the username and password to the request headers
//     const username = 'pricelist';
//     const password = 'quantum123@';

//     // Encode the username and password to Base64
//     const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);

//     // Clone the request and add the authorization header
//     request = request.clone({
//       setHeaders: {
//         Authorization: basicAuthHeader
//       }
//     });

//     // Pass the cloned request to the next handler
//     return next.handle(request);
//   }
// }
