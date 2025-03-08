import {Locator, Page} from "@playwright/test";
import Wrapper from "../base/Wrapper";

export default  class LoginPage extends Wrapper{
    get username(): Locator {
        return this._username;
    }

    set username(value: Locator) {
        this._username = value;
    }

    get password(): Locator {
        return this._password;
    }

    set password(value: Locator) {
        this._password = value;
    }

    get submit_button(): Locator {
        return this._submit_button;
    }

    set submit_button(value: Locator) {
        this._submit_button = value;
    }
    get innerPage(): Page {
        return this._innerPage;
    }

    set innerPage(value: Page) {
        this._innerPage = value;
    }
    private _innerPage : Page;
    private _username : Locator;
    private _password : Locator;
    private _submit_button: Locator;
    constructor(page : Page) {
        super(page);
        this.innerPage = page;
        this.getElements();
    }

    private async getElements(){
        this.username = await this.innerPage.getByRole('textbox', { name: 'Username' });
        this.password = await this.innerPage.getByRole('textbox', { name: 'Password' });
        this.submit_button = await this.innerPage.getByRole('button', { name: 'Log in' });
    }

    public async login(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.submit_button.click();
    }
    public async visit_globalsetup(url){
        await this.page.goto(url, { timeout: 120*1000 });
    }

    public async saveLogedinState(filename: string){
        await this.page.context().storageState({ path: filename });
    }
}