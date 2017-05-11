
import { Injectable } from '@angular/core';
import { Subject } from 'Rxjs/subject';

@Injectable()
export class UpdateStatusLogin {
    
    private newLogStatus = new Subject<any>();
    private arguments: any[] = [];

    newStatus = this.newLogStatus.asObservable();

    changeStatus(...args: any[]) {
        args.forEach((val, i) => {
            this.arguments.push(val);
        })
        this.newLogStatus.next(this.arguments);
    }

}