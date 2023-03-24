import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mockData, mockDataSend } from '../helpers/data.mock';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });

  it('should retrieve data from the API via GET', () => {
    spyOn(service, 'getPokemon').and.returnValue(of(mockData))
    service.getPokemon("1").subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });
  it('should send data to the API via Post', () => {
    spyOn(service, 'postPokemon').and.returnValue(of(mockData))
    service.postPokemon(mockDataSend).subscribe(response => {
      expect(response).toEqual(mockData);
    });
  });
  it('should update data to the API via Put', () => {
    spyOn(service, 'putPokemon').and.returnValue(of(mockData))
    service.putPokemon(355, mockDataSend).subscribe(response => {
      expect(response).toEqual(mockData);
    });
  });
  it('should delete data to the API via Delete', () => {
    spyOn(service, 'deletePokemon').and.returnValue(of({success: "ok"}))
    service.deletePokemon(355).subscribe(response => {
      expect(response).toBeTruthy();
    });
  });

});
