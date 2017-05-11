import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Title change
@Injectable()
export class TitleService {

    constructor(private title: Title){}

    getTitle():string {
        return this.title.getTitle();
    }

    setTitle(newTitle: string) {
        this.title.setTitle(newTitle);
    }

}