import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {CurrentUserService} from '../../current-user.service';
import {Router} from '@angular/router';
import {NewRequestData} from '../../dtos/newRequestData';
declare var $: any;

@Component({
  selector: 'app-inhabitant-new-request-page',
  templateUrl: './inhabitant-new-request-page.component.html',
  styleUrls: ['./inhabitant-new-request-page.component.css']
})
export class InhabitantNewRequestPageComponent implements OnInit, AfterViewInit {

  categories: string[];
  newRequest: NewRequestData;
  message: string;

  constructor(
    private apiService: ApiService,
    private currentUser: CurrentUserService,
    private router: Router
  ) { }

  send(selectedCategory: number) {
    this.newRequest.category = this.categories[selectedCategory];
    if (this.newRequest.title === '' || this.newRequest.description === '') {
      this.message = 'Wypełnij wszystkie pola swojego zgłoszenia';
      return;
    }

    if (this.newRequest.title.length > 50 || this.newRequest.description.length > 500 ) {
      this.message = 'Przekroczyłeś limit znaków, spróbuj opisać problem bardziej zwięźle';
      return;
    }

    this.apiService.callApi('api/request', 'POST', this.newRequest, this.currentUser.token).then(
      data => {
        this.newRequest.title = '';
        this.newRequest.description = '';
        this.message = 'Zgłoszenie zostało wysłane';
      }
    ).catch(data => {
      this.message = 'Wystąpił błąd przy wysyłaniu zgłoszenia';
    });
  }

  ngOnInit() {
    this.newRequest = new NewRequestData();
    this.newRequest.title = '';
    this.newRequest.description = '';

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
    // $('#navigationNewRequest').addClass('blue-grey');
    // $('#navigationNewRequest').addClass('active');
    // $('#navigationNewRequest').removeClass('black-text');

    this.apiService.callApi('api/categories', 'GET', null, this.currentUser.token).then(
      data => {
        this.categories = data;
        // $(document).ready(function() {
        //   $('select').formSelect();
        // });
      }
    );

  }

  ngAfterViewInit(): void {
    // $(document).ready(function() {
    //   $('input#title, textarea#textarea').characterCounter();
    // });
  }

}
