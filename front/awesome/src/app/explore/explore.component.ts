import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  public nombre:string;
  public dni: string;

  public url: string = "https://hackathon-server-cazdemun.c9users.io/";
  public panelOpenState = false;
  public arrayProjects;

  public pdfSrc:string;
  public currentProject: any;
  
  constructor(private route:ActivatedRoute
    , private http: HttpClient,
    private router: Router) { 
      this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.dni = params.dni;
        this.nombre = params.nombre;  
    });

    this.http.get(this.url+'getactiveProjects')
    .subscribe( (response:any) => {
      this.arrayProjects = response.value;
      [,...this.arrayProjects] = [...this.arrayProjects];
      console.log(this.arrayProjects);
      }
    );
    }

  ngOnInit() {

  }

  signDocument(){
    let json = { id:this.currentProject.id, dni:this.dni};
    this.http.post(this.url + 'signProject', json)
    .subscribe( (response:any) => {
      console.log(response);

      );
  }

  public statusPdf: boolean = true;
  openPdf(e, i){
    this.statusPdf = !this.statusPdf;       
    this.pdfSrc = e;
    this.currentProject = i;
    console.log(this.currentProject);
  }
  
  agree(e,i){
    let json = {value:e, id:i, dni:this.dni};
    this.http.post(this.url + 'voteProject', json)
    .subscribe( (response:any) => {
      console.log(response);
      this.http.get(this.url+'getactiveProjects')
      .subscribe( (response:any) => {
        this.arrayProjects = response.value;
        [,...this.arrayProjects] = [...this.arrayProjects];
        }
      );
      // this.router.navigate(['/explore'], {
      //   queryParams:{
      //     dni: this.dni,
      //     nombre: this.nombre
      //   }});
      }
    );
  }
  changePage(){
    // this.router.navigate(['/explorer'], {
    // queryParams:{
    //   dni: result.DNI,
    //   nombre: response.result.Nombre
    // }});
  }


}
