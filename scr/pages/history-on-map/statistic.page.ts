import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";
import el from "../../../resource/element/history-on-map.json";

export default class StatisticPage extends Wrapper{
    get driving_time(): Locator {
        return this._driving_time;
    }

    set driving_time(value: Locator) {
        this._driving_time = value;
    }

    get stopped_time(): Locator {
        return this._stopped_time;
    }

    set stopped_time(value: Locator) {
        this._stopped_time = value;
    }

    get idle_time(): Locator {
        return this._idle_time;
    }

    set idle_time(value: Locator) {
        this._idle_time = value;
    }

    get equipment_time(): Locator {
        return this._equipment_time;
    }

    set equipment_time(value: Locator) {
        this._equipment_time = value;
    }

    get engagement_time(): Locator {
        return this._engagement_time;
    }

    set engagement_time(value: Locator) {
        this._engagement_time = value;
    }

    get private_distance(): Locator {
        return this._private_distance;
    }

    set private_distance(value: Locator) {
        this._private_distance = value;
    }

    get total_distance(): Locator {
        return this._total_distance;
    }

    set total_distance(value: Locator) {
        this._total_distance = value;
    }

    get number_trips(): Locator {
        return this._number_trips;
    }

    set number_trips(value: Locator) {
        this._number_trips = value;
    }
    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private _driving_time : Locator;
    private _stopped_time : Locator;
    private _idle_time : Locator;
    private _equipment_time : Locator;
    private _engagement_time : Locator;
    private _private_distance : Locator;
    private _total_distance : Locator;
    private _number_trips : Locator;


    private async getElements(){
        this.driving_time = await this.findLocator(el.statistics.driving_time);
        this.stopped_time = await this.findLocator(el.statistics.stopped_time);
        this.idle_time = await this.findLocator(el.statistics.idle_time);
        this.equipment_time = await this.findLocator(el.statistics.equipment_time);
        this.engagement_time = await this.findLocator(el.statistics.engagement_time);
        this.private_distance = await this.findLocator(el.statistics.private_distance);
        this.total_distance = await this.findLocator(el.statistics.total_distance);
        this.number_trips = await this.findLocator(el.statistics.number_trips);
    }
}
