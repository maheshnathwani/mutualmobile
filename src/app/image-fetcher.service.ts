import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from './Image';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ImageFetcherService {
  url = `http://demo4126999.mockable.io/images`;
  constructor(private httpClient: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.url);
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient
      .get(imageUrl, { responseType: 'blob' })
      .pipe(map((res: Blob) => res));
  }
}
