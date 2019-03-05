import { TestBed } from '@angular/core/testing';

import { ImageFetcherService } from './image-fetcher.service';

describe('ImageFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageFetcherService = TestBed.get(ImageFetcherService);
    expect(service).toBeTruthy();
  });
});
