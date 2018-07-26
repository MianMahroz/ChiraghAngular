import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';

import { PagerServiceService} from '../pager-service.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-sellerdashboard-pagination',
  templateUrl: './sellerdashboard-pagination.component.html',
  styleUrls: ['./sellerdashboard-pagination.component.css']
})
export class SellerdashboardPaginationComponent implements OnInit {

  @Input() title:string;
  @Input() isBidActivity:boolean;
  @Input() data:any[];

  constructor( private PagerService: PagerServiceService) { }

  public allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {

    this.allItems=this.data;
    // initialize to page 1
    this.setPage(1);
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.PagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
