import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-success-msg',
  templateUrl: './property-success-msg.component.html',
  styleUrls: ['./property-success-msg.component.css']
})
export class PropertySuccessMsgComponent implements OnInit {

  async ngAfterViewInit() {
		await this.loadScript('./assets/js/common.js');
	}

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

  constructor() { }

  ngOnInit() {
  }

}
