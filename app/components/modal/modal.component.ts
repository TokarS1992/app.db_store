import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import * as services from '../../services/index';

@Component({
  selector: "modal-head",
  template: "<ng-content></ng-content>"
})
export class ModalHead {}

@Component({
  selector: "modal-cont",
  template: "<ng-content></ng-content>"
})
export class ModalCont {}


const bodyHeight: string = 100 + "%";

// Extands inteface EventTarget
interface IEventTarget extends EventTarget {
	className: String
}

// Interface class ModalComponent
interface IModalEvents {
	closeModal(): void,
	closedAll(e: IEventTarget): void
}

@Component({
	selector: "modal",
	templateUrl: "./modal.component.html",
	moduleId: module.id,
	host: {
		"(document:click)": "closedAll($event.target)"
	},
	providers: [
		services.HttpAuthService
	]
})

export class ModalComponent implements OnInit, IModalEvents {
  	
	// Settings modal
	@Input() private modalName: string;
	@Input() private modalClose: boolean = true;
	@Input() private closeCont: Object = {
		class: "close",
		// contentButt: ""
	};
	@Input() private closeEverywhere: boolean = true;
	
	private animate: boolean = false;
	private id_modal: string = addCountModal("modal_");
	private fixedBoby: number;
	
	constructor( 
		private _router: Router
	) { }
	
	ngOnInit() {
		this.fixedBoby = document.body.offsetHeight;
		setTimeout(() => {
			this.animate = true
			// Change bodyHeight on 100%
			document.body.style.height = bodyHeight;
		});
	}

	closeModal(): void {
		this.animate = false;
		setTimeout(() => {
			let currentPath: string = this._router.url;
			let path: string = currentPath.match(/\/[a-z]+/g).join('');
			this._router.navigateByUrl(path);

			// Return bodyHeight
			document.body.style.height = this.fixedBoby + "px";

		}, 400);
	}

	closedAll(e: IEventTarget): void {
		if (this.closeEverywhere) {
			if (e.className.match(/_modal/)) {
				this.closeModal();
			}
		}
	}

}

let modal_id = 1;

export function addCountModal(prefix: string):string {
	return prefix + modal_id++;
}
