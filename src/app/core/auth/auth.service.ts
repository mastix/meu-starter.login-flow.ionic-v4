import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = "X-Auth-Token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(_ => {
      this.checkToken();
    })
  }

  private checkToken(): Promise<void>  {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authState$.next(true);
      }
    })
  }

  public login(): Promise<void> {
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
      this.authState$.next(true);
    })
  }

  public logout(): Promise<void>  {
    return this.storage.remove(TOKEN_KEY).then(_ => {
      this.authState$.next(false);
    })
  }

  public getAuthStateObserver(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  public isAuthenticated() {
    console.log('isAuthenticated: ', this.authState$.getValue());
    console.log('isAuthenticated: ', this.authState$.value);
    console.log('isAuthenticated: ', this.authState$);

    return this.authState$.value;
  }
}
