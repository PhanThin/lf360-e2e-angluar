import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";
import el from "../../../resource/element/history-on-map.json";
export default class FinalTotalRow extends Wrapper{
    get itself(): Locator {
        return this._itself;
    }

    set itself(value: Locator) {
        this._itself = value;
    }

    get distance(): Locator {
        return this._distance;
    }

    set distance(value: Locator) {
        this._distance = value;
    }

    get stopped_time(): Locator {
        return this._stopped_time;
    }

    set stopped_time(value: Locator) {
        this._stopped_time = value;
    }

    get engagement_time(): Locator {
        return this._engagement_time;
    }

    set engagement_time(value: Locator) {
        this._engagement_time = value;
    }

    get duration(): Locator {
        return this._duration;
    }

    set duration(value: Locator) {
        this._duration = value;
    }
    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private _itself : Locator;
    private _distance : Locator;
    private _stopped_time : Locator;
    private _engagement_time : Locator;
    private _duration : Locator;

    private async getElements(){
        this.itself = await this.findLocator(el.journey.final_total.itself);
        this.distance = await this.itself.locator(el.journey.final_total.distance);
        this.stopped_time = await this.itself.locator(el.journey.final_total.stopped_time);
        this.engagement_time = await this.itself.locator(el.journey.final_total.engagement_time);
        this.duration = await this.itself.locator(el.journey.final_total.duration);
    }
}