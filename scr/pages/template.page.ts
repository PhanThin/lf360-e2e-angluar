import Wrapper from "../base/Wrapper";
import {Page} from "@playwright/test";

export default class TemplatePage extends Wrapper{
    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private async getElements(){

    }
}