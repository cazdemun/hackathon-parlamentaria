import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  public nombre:string;
  public dni: string;

  public menuOptions = [
    {
      img: 'assets/images/1.svg',
      title: "Observa",
      description: " el estado de tu proyecto"
    },
    {
      img: 'assets/images/2.svg',
      title: "Analiza",
      description: " más proyectos de ley"
    },
    { 
      img: 'assets/images/3.svg',
      title: "Plantea",
      description: " tu proyecto de ley"
    },

  ]
  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 3, color: 'red'},
    {text: 'Two', cols: 1, rows: 3, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 3, color: 'lightpink'},
  ];

  constructor(private router:Router,
  private route:ActivatedRoute) {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.dni = params.dni;
      this.nombre = params.nombre;  
   });
  }

  ngOnInit() {
  }
  
  
  changePages(path){
    this.router.navigate([path], {
      queryParams:{
        dni: this.dni,
        nombre: this.nombre
      }});
  }

  selectOption(i){
    if(i == 0){
      this.changePages('/explore');
    }
    else if(i == 1){
      this.changePages('/Analiza');
    }
    else {
      this.changePages('/Plantea');
    }
  }
}
