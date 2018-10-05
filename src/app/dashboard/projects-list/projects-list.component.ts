import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
 id;
  idproj;
  emps;
  name;
  startdate;
  enddate;


  projects: any;

  constructor(public projServ: ProjectService, public route :ActivatedRoute ) {
    this.getAllProjects()

  }
  ngOnInit() {
  }

  getAllProjects(){
    this.projServ.getallProjects().subscribe(res=>{
      console.log(res);
      this.projects=res;
    })
  }

  listEmpsByProject(){

    this.projServ.listEmpsByProject(this.idproj).subscribe( data =>{
      this.emps=data
    })
  }



  editProject(id,name,startdate,enddate){

    this.id=id;
    this.name=name;
    this.startdate=startdate;
    this.enddate=enddate;
}

  updateProject(){

    this.projServ.updateProject(this.id,this.name, this.startdate, this.enddate).subscribe(res=>{
      this.getAllProjects()
      swal(
        'Good job!',
        'An Employee has been edited!',
        'success'
      )

    })
  }

}
