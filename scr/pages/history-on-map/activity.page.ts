import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";
import el from "../../../resource/element/history-on-map.json";
export default class ActivityPage extends Wrapper{
    get last_journey(): Locator {
        return this._last_journey;
    }

    set last_journey(value: Locator) {
        this._last_journey = value;
    }
    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private _last_journey : Locator;
    private async getElements(){
        this.last_journey = await this.findLocator(el.activity_log.last_journey);
    }
}