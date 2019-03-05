import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
interface Image {
  name: string;
  image_url: string;
}
@Injectable({
  providedIn: 'root'
})
export class ImageFetcherService {
  url = `http://demo4126999.mockable.io/images`;
  constructor(private httpClient: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.url);
  }
}
