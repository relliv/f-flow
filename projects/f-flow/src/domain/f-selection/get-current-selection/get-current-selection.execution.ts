import { GetCurrentSelectionRequest } from './get-current-selection.request';
import { inject, Injectable } from '@angular/core';
import { FExecutionRegister, IExecution } from '@foblex/mediator';
import { FDraggableDataContext } from '../../../f-draggable';
import { ICurrentSelection } from './i-current-selection';

@Injectable()
@FExecutionRegister(GetCurrentSelectionRequest)
export class GetCurrentSelectionExecution implements IExecution<GetCurrentSelectionRequest, ICurrentSelection> {

  private _fDraggableDataContext = inject(FDraggableDataContext);

  public handle(): ICurrentSelection {
    return {
      fNodeIds: this._getSelectedNodes(),
      fGroupIds: this._getSelectedGroups(),
      fConnectionIds: this._getSelectedConnections()
    }
  }

  private _getSelectedNodes(): string[] {
    return this._fDraggableDataContext.selectedItems
      .filter(x => x.hostElement.classList.contains('f-node'))
      .map(x => x.hostElement.dataset[ 'fNodeId' ]!);
  }

  private _getSelectedGroups(): string[] {
    return this._fDraggableDataContext.selectedItems
      .filter(x => x.hostElement.classList.contains('f-group'))
      .map(x => x.hostElement.dataset[ 'fGroupId' ]!);
  }

  private _getSelectedConnections(): string[] {
    return this._fDraggableDataContext.selectedItems
      .filter(x => !x.hostElement.classList.contains('f-node') && !x.hostElement.classList.contains('f-group'))
      .map(x => x.hostElement.id);
  }
}
