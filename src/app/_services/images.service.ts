import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Api } from 'src/app/_api/mock.api';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private imageUrls = new Map<string, BehaviorSubject<string|null>>();

  constructor(
    private api: Api
  ) { }

  getImageUrl = (uuid: string): BehaviorSubject<string|null> => {
    if (!this.imageUrls.has(uuid)) {
      const imageUrl$ = new BehaviorSubject<string|null>(null);
      this.imageUrls.set(uuid, imageUrl$);
      this.api.getImageUrl(uuid).then(imageUrlResponse => {
        imageUrl$.next(imageUrlResponse);
      });
    }
    return this.imageUrls.get(uuid) as BehaviorSubject<string|null>;
  }

  uploadImage = (dataUrl: string) => {
    return this.api.uploadImage(dataUrl).then(uuidResponse => {
      const imageUrl$ = new BehaviorSubject<string|null>(null);
      this.imageUrls.set(uuidResponse, imageUrl$);
      imageUrl$.next(dataUrl);
      return uuidResponse;
    });
  }

  deleteImage = (uuid: string) => {
    return this.api.deleteImage(uuid).then(() => {
      this.imageUrls.get(uuid)?.complete();
      this.imageUrls.delete(uuid);
    });
  }
}
