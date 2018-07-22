import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() public myInput: string;
  public dni:string;
  public url:string = 'https://www.facturacionelectronica.us/facturacion/controller/ws_consulta_rucdni_v2.php?documento=DNI&usuario=10415898890&password=webmaster2018&nro_documento=';
  constructor(private router: Router
    , private http: HttpClient) {
  }

  ngOnInit() {
  }

  login(){
    this.http.get(this.url + this.dni)
    .subscribe( (response:any) => {
      console.log(response);
      this.router.navigate(['/menu'], {
        queryParams:{
          dni: response.result.DNI,
          nombre: response.result.Nombre
        }});
      }
    );
  }

  updateValue(e){
    this.dni = e.target.value;
  }
}
