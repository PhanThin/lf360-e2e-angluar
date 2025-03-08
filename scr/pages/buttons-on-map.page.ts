import {Locator, Page} from "@playwright/test";
import Wrapper from "../base/Wrapper";

export default  class ButtonsOnMapPage extends Wrapper{


    private _map_view : Locator;
    private _list_view : Locator;
    private _history : Locator;

    get map_view(): Locator {
        return this._map_view;
    }

    set map_view(value: Locator) {
        this._map_view = value;
    }

    get list_view(): Locator {
        return this._list_view;
    }

    set list_view(value: Locator) {
        this._list_view = value;
    }

    get history(): Locator {
        return this._history;
    }

    set history(value: Locator) {
        this._history = value;
    }

    private _innerPage : Page;

    constructor(page : Page) {
        super(page);
        this.getElements();
    }

    private async getElements(){

        this.map_view = await this.page.locator('#mapView');//choose map
        this.list_view = await this.page.locator('#overView'); //choose list view
        this.history = await this.page.locator('#historyView'); //history
    }


}