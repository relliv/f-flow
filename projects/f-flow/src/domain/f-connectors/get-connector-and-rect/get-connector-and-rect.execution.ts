import { inject, Injectable } from '@angular/core';
import { FExecutionRegister, FMediator, IExecution } from '@foblex/mediator';
import { GetConnectorAndRectRequest } from './get-connector-and-rect-request';
import { IRoundedRect } from '@foblex/2d';
import { IConnectorAndRect } from '../i-connector-and-rect';
import { FConnectorBase } from '../../../f-connectors';
import {GetNormalizedConnectorRectRequest} from "../../get-normalized-connector-rect";

@Injectable()
@FExecutionRegister(GetConnectorAndRectRequest)
export class GetConnectorAndRectExecution implements IExecution<GetConnectorAndRectRequest, IConnectorAndRect> {

  private readonly _fMediator = inject(FMediator);

  public handle(request: GetConnectorAndRectRequest): IConnectorAndRect {
    return {
      fConnector: request.fConnector,
      fRect: this._getConnectorRect(request.fConnector)
    }
  }

  private _getConnectorRect(fConnector: FConnectorBase): IRoundedRect {
    return this._fMediator.execute<IRoundedRect>(new GetNormalizedConnectorRectRequest(fConnector.hostElement));
  }
}
