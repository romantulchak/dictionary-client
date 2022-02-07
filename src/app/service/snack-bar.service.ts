import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarActionType } from "../model/enum/snackbar-action.enum";

const ACTION = "Ok";

@Injectable({
    providedIn:'root'
})
export class SnackbarService{
    constructor(private snackBar: MatSnackBar){
    }

    public showSuccessMessage(message: string): void{
        this.initSnackbar(message, SnackbarActionType.SUCCESS);
    }


    public showWarningMessage(message: string): void{
        this.initSnackbar(message, SnackbarActionType.WARNING);
    }


    public showErrorMessage(message: string): void{
        this.initSnackbar(message, SnackbarActionType.ERROR);
    }

    private initSnackbar(message: string, action: SnackbarActionType): void{
        if(message === undefined || message === ""){
            message = "Something went wrong";
        }
        this.snackBar.open(message, ACTION, {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: this.getSnackbarClass(action),
            duration: 7000
        });
    }

    private getSnackbarClass(action: SnackbarActionType): string{
        switch(action){
            case SnackbarActionType.SUCCESS:
                return "success__message";
            case SnackbarActionType.WARNING:
                return "warning__message";
            case SnackbarActionType.ERROR:
                return "error__message";
            default:
                return "default__message";
        }
    }
}
