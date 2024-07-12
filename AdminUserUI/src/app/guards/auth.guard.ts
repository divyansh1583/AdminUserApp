import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('login_token')){
    return true
  }
  return false;
};
