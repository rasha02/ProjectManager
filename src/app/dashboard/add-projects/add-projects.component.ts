import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '../../../../node_modules/@angular/common/http';
import swal from 'sweetalert2';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit {
  id;
  textareaValue = '';
  text;
  name;
  startdate;
  enddate;
  priority;
  rate;
  type;
  file;
  msg;
  docs;
  emps;
  filesToUpload: Array<File>;
  theclient;
  idclient;
  clients: any ;
  projects: any;
  listclients;
  base_url="http://localhost:3000/"

  constructor(public projectServ: ProjectService, public clientServ: ClientService,  public route :ActivatedRoute, private http:HttpClient ) {
    this.textareaValue = ''
    //this.msg="test"
   this.listClients()
  }

  ngOnInit() {
  }

  addProject() {
    //var x = document.getElementById("myTextarea")
    //console.log(x)

    if (this.filesToUpload != null){

      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      formData.append("pdf", files[0], files[0]['name']);

      this.projectServ.addProject(this.name,this.theclient,this.startdate,this.enddate,this.priority,this.type,this.rate,this.msg, formData).subscribe(data=>{
        console.log("done")
        swal(
          'Good job!',
          'A Project has been added!',
          'success'
        )
      })

    /*  this.http.post(this.base_url + "project/addProject?name=" + name + "&theclient=" + theclient + "&startdate=" + startdate + "&enddate=" + enddate + "&priority=" + priority + "&type=" + type + "&rate=" + rate + "&msg=" + msg, formData).subscribe(res => {
        swal(
          'Good job!',
          'You added a project!',
          'success'
        )
      })*/

  }
  else{
    console.log()
      this.projectServ.addProjectWithoutFile(this.name, this.theclient, this.startdate, this.enddate, this.priority, this.type, this.rate, this.msg).subscribe(res=>{
        console.log("done")
        swal(
          'Good job!',
          'A Project has been added!',
          'success'
        )

      })
  }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  doTextareaValueChange(ev) {
    try {
      console.log('done')

      this.textareaValue = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }



  getIdClient(theclient){

    this.idclient=theclient
    console.log(theclient)
  }


  listClients(){

    this.clientServ.getClients().subscribe( res => {

        this.clients=res

    })
  }





}
