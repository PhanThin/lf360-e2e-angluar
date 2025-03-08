import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";

export default class ValidationReportMenu extends Wrapper{
    get btnLabor(): Locator {
        return this._btnLabor;
    }

    set btnLabor(value: Locator) {
        this._btnLabor = value;
    }

    get btnEquipment(): Locator {
        return this._btnEquipment;
    }

    set btnEquipment(value: Locator) {
        this._btnEquipment = value;
    }

    get btnMaterial(): Locator {
        return this._btnMaterial;
    }

    set btnMaterial(value: Locator) {
        this._btnMaterial = value;
    }
    private _btnLabor : Locator;
    private _btnEquipment : Locator;
    private _btnMaterial : Locator;
    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private async getElements(){
        this.btnLabor = await this.findLocator('button:has-text("Labor")');
        this.btnEquipment = await this.findLocator('button:has-text("Equipment")');
        this.btnMaterial = await this.findLocator('button:has-text("Material")');
    }
}