import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {CurrentUserService} from '../../current-user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-inhabitant-request-details',
  templateUrl: './inhabitant-request-details.component.html',
  styleUrls: ['./inhabitant-request-details.component.css']
})
export class InhabitantRequestDetailsComponent implements OnInit {

  request: any;



  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private currentUser: CurrentUserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRequest();
    this.request = '';
  }

  getRequest() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.apiService.callApi('api/request/' + id, 'GET', null, this.currentUser.token).then(
      data => {
        this.request = data;
      }
    ).catch(
      data => {
        this.router.navigate(['/inhabitantPage/requests']);
      }
    );

  }

  removeRequest() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.apiService.callApi('api/request/' + id, 'DELETE', null, this.currentUser.token).then(
      data => {
        this.router.navigate(['/inhabitantPage/requests']);
      }
    );
  }
}
