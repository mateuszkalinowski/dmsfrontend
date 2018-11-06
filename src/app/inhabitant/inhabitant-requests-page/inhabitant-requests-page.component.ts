import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {CurrentUserService} from '../../current-user.service';
import {Router} from '@angular/router';
import {PaginationInfo} from '../../dtos/paginationInfo';
import {PaginationService} from '../../utils/pagination.service';
declare var $: any;

@Component({
  selector: 'app-inhabitant-requests-page',
  templateUrl: './inhabitant-requests-page.component.html',
  styleUrls: ['./inhabitant-requests-page.component.css']
})
export class InhabitantRequestsPageComponent implements OnInit, AfterViewInit {

  requests: any;
  numberOfItemsOnPage: number;

  activePage: number;

  numberOfPages: number;
  paginationInfo: PaginationInfo;

  constructor(
    private apiService: ApiService,
    private currentUser: CurrentUserService,
    private router: Router,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {

    // $('#navigationNews').removeClass();
    // $('#navigationNewRequest').removeClass();
    // $('#navigationRequests').removeClass();
    // $('#navigationSettings').removeClass();
    //
    // $('#navigationNews').addClass('collection-item');
    // $('#navigationNews').addClass('black-text');
    // $('#navigationNewRequest').addClass('collection-item');
    // $('#navigationNewRequest').addClass('black-text');
    // $('#navigationRequests').addClass('collection-item');
    // $('#navigationRequests').addClass('black-text');
    // $('#navigationSettings').addClass('collection-item');
    // $('#navigationSettings').addClass('black-text');
    //
    // $('#navigationRequests').addClass('blue-grey');
    // $('#navigationRequests').addClass('active');
    // $('#navigationRequests').removeClass('black-text');

    this.numberOfItemsOnPage = 8;
    this.paginationInfo = new PaginationInfo();
    this.showPage(0);
  }

  ngAfterViewInit(): void {
    $(document).ready(function() {
      $('.modal').modal();
    });
  }

  private showPage(pageNumber: number) {
    this.apiService.callApi('api/request?page=' + pageNumber + '&size=' + this.numberOfItemsOnPage,
      'GET', null, this.currentUser.token).then(
      data => {
        this.requests = data.content;

        this.numberOfPages = data.pageCount;

        this.paginationInfo = this.paginationService.pageContent(this.numberOfPages, pageNumber);
        this.activePage = pageNumber;
      }
    );
  }
}
