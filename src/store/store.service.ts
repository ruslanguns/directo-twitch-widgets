import { Injectable } from '@nestjs/common';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class StoreService {
  private _store = new BehaviorSubject({
    selectedChat: null,
  });

  private action$ = this._store.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this._store.value;
  }

  select<T = any>(name: string): Observable<T> {
    return this.action$.pipe(pluck(name)) as Observable<T>;
  }

  dispatch(name: string, state: any) {
    this._store.next({
      ...this.value,
      [name]: state,
    });
  }
}
