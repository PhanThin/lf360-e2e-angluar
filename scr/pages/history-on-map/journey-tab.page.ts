import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";
import el from "../../../resource/element/history-on-map.json";
import FinalTotalRow from "./final-total-row.page";
import WeekTotalRowPage from "./a-week/week-total-row.page";
import AWeekPage from "./a-week/a-week.page";
export default class JourneyTabPage extends Wrapper{
    get weeks(): AWeekPage[] {
        return this._weeks;
    }

    set weeks(value: AWeekPage[]) {
        this._weeks = value;
    }

    get finalTotalRow(): FinalTotalRow {
        return this._finalTotalRow;
    }

    set finalTotalRow(value: FinalTotalRow) {
        this._finalTotalRow = value;
    }
    constructor(page : Page) {
        super(page);        
    }

    private _finalTotalRow : FinalTotalRow;
    private _weeks : AWeekPage[] = [];

    public async getElements(){
        await  this.page.locator(el.journey.week).nth(0).waitFor()
        this.finalTotalRow = new FinalTotalRow(this.page);
        let numberTotalWeeks = await this.page.locator(el.journey.week).count();
        for (let i=0; i < numberTotalWeeks; i++){
            let aWeek = new AWeekPage(this.page);
            await aWeek.getElements(await this.page.locator(el.journey.week).nth(i));
            this._weeks.push(aWeek);
        }
    }
}