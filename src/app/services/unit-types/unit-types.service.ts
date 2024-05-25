import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FindAllUnitTypesRes} from '../../models/find-all-unit-types-res';

@Injectable({
  providedIn: 'root'
})
export class UnitTypesService {

  private readonly _unitTypesURI = `${environment.DESPENSA_REST_API_URL}/unit-types`;

  constructor(private httpClient: HttpClient) {
  }

  findAll() {
    return this.httpClient.get<FindAllUnitTypesRes>(this._unitTypesURI);
  }

}
