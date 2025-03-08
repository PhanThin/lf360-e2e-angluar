import {Locator, Page} from "@playwright/test";
import ChooseParameterActionModalPage from "../choose-parameter-action-modal.page";

export default class EditCommentPage extends ChooseParameterActionModalPage{
    get comment(): Locator {
        return this._comment;
    }

    set comment(value: Locator) {
        this._comment = value;
    }
    private _comment : Locator;
    constructor(page : Page) {
        super(page);
        this.comment =  this.page.locator('textarea[placeholder="Type your comment"]');
    }

}