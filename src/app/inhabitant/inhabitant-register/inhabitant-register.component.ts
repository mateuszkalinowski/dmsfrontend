import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {InhabitantRegistrationData} from '../../dtos/inhabitantRegistrationData';
import {ApiService} from '../../api.service';
declare var $: any;

@Component({
  selector: 'app-inhabitant-register',
  templateUrl: './inhabitant-register.component.html',
  styleUrls: ['./inhabitant-register.component.css'],
})
export class InhabitantRegisterComponent implements OnInit, AfterViewInit {

  @Input() inhabitantRegistrationData: InhabitantRegistrationData;
  message: string;
  confirmPassword: string;
  confirmEmail: string;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.inhabitantRegistrationData = new InhabitantRegistrationData();
    this.message = '';
  }

  register() {
    this.apiService.callApi('api/inhabitant/add', 'POST', this.inhabitantRegistrationData, null).then(
      data => {
        this.message = data.message;
      }
    ).catch(data => {
      this.message = data.message;
    });
  }

  ngAfterViewInit(): void {
    $(document).ready(function() {
      $('select').formSelect();
    });
  }

}
