import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {FindAllUnitTypesRes} from '@app/models/find-all-unit-types-res';
import {tap} from 'rxjs';
import {MessagePrimeNgService} from '@app/services/external/message-prime-ng.service';

@Injectable({
  providedIn: 'root'
})
export class UnitTypesService {

  private readonly _unitTypesURI = `${environment.DESPENSA_REST_API_URL}/unit-types`;

  constructor(
    private httpClient: HttpClient,
    private messagePrimeNgService: MessagePrimeNgService
  ) {
  }

  findAll() {
    return this.httpClient.get<FindAllUnitTypesRes>(this._unitTypesURI)
               .pipe(
                 tap({
                   error: ({error}) => this.messagePrimeNgService.showError(error.error.detail)
                 })
               );
  }

}
