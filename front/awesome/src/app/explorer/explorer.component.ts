import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  public nombre:string;
  public dni: string;

  public url: string = "https://hackathon-server-cazdemun.c9users.io/";

  public arrayProjects;

  constructor(private route:ActivatedRoute
    , private http: HttpClient) { 
      this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.dni = params.dni;
        this.nombre = params.nombre;  
    });

    this.http.get(this.url+'getactiveProjects')
    .subscribe( (response:any) => {
      this.arrayProjects = response.value;
      console.log(this.arrayProjects);
      }
    );
    }

  ngOnInit() {
  }

  changePage(){
    // this.router.navigate(['/explorer'], {
    // queryParams:{
    //   dni: result.DNI,
    //   nombre: response.result.Nombre
    // }});
  }


}
