import Wrapper from "../../../base/Wrapper";
import {Locator, Page} from "@playwright/test";
import el from "../../../../resource/element/history-on-map.json";
export default class WeekDayPage extends Wrapper{
    constructor(page : Page, itself : Locator) {
        super(page);
        this.getElements(itself);

    }
    private _itself : Locator;
    private _day : Locator;
    private _hour : Locator;
    private _distance : Locator;
    private _stopped_time : Locator;
    private _engagement_time : Locator;

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

    get day(): Locator {
        return this._day;
    }

    set day(value: Locator) {
        this._day = value;
    }

    get hour(): Locator {
        return this._hour;
    }

    set hour(value: Locator) {
        this._hour = value;
    }

    private _duration : Locator;
    private async getElements(itself : Locator){
        this.itself = itself;
        this.day = await this.itself.locator(el.journey.week_day.day);
        this.hour = await this.itself.locator(el.journey.week_day.hour);
        this.distance = await this.itself.locator(el.journey.week_day.distance);
        this.stopped_time = await this.itself.locator(el.journey.week_day.stopped_time);
        this.engagement_time = await this.itself.locator(el.journey.week_day.engagement_time);
        this.duration = await this.itself.locator(el.journey.week_day.duration);
    }
}