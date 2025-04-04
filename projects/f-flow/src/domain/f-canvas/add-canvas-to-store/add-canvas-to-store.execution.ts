import { inject, Injectable } from '@angular/core';
import { FExecutionRegister, IExecution } from '@foblex/mediator';
import { AddCanvasToStoreRequest } from './add-canvas-to-store-request';
import { FComponentsStore } from '../../../f-storage';

@Injectable()
@FExecutionRegister(AddCanvasToStoreRequest)
export class AddCanvasToStoreExecution implements IExecution<AddCanvasToStoreRequest, void> {

  private _fComponentsStore = inject(FComponentsStore);

  public handle(request: AddCanvasToStoreRequest): void {
    this._fComponentsStore.fCanvas = request.fCanvas;
  }
}
