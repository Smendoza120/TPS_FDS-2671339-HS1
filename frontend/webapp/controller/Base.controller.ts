import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class Base extends Controller {

    public getRouter(){
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }
}