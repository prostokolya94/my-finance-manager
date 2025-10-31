import {makeAutoObservable} from "mobx";
import {Page} from "@/types/Types";

export class AppStore {

    private _page: Page = Page.HOME;

    constructor() {
        makeAutoObservable(this);
    }
}