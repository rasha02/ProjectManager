import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  idproj;

  constructor(public projServer : ProjectService , public route : ActivatedRoute) {
    this.idproj=this.route.snapshot.params['idproj']
    console.log(this.idproj)
    
  }

  ngOnInit() {
  }

}
