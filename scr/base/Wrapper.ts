import {Locator, Page} from "@playwright/test";

export default  class  Wrapper{
    constructor(public  page:Page) {
        this.page = page;
    }

    public async waitSpinnerEnd(){
        try {
            await this.page.locator('.lf-loader-overlay .lf-spinner').waitFor({state: "attached", timeout:30000});
            await this.page.locator('.lf-loader-overlay .lf-spinner').waitFor({state: "detached", timeout:30000});
            return true;
        } catch (e) {
            await this.page.waitForSelector('.lf-loader-overlay .lf-spinner',{state: 'hidden'});
            console.log('HANDLED EXCEPTION When WAITING SPINNER');
            return true;
        }
        return false;
    }
    
    public async findLocator(value:string, options?:{
        frame?:string,
        tabId?: number,
        timeOut?: number,
        has?: Locator,
        hasText?: string
    }) : Promise<Locator> {
        if (options?.tabId){
            this.page = this.page.context().pages()[options.tabId];
        }
        if (options?.frame){
            this.page.frameLocator(options.frame).locator(value, {has: options?.has, hasText: options?.hasText});
        }
        return this.page.locator(value, {has: options?.has, hasText: options?.hasText});
    }

    public getUrl(): string{
        return this.page.url();
    }
}