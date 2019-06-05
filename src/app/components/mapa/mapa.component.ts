import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;
  
  marcadores :Marcador[] = [];
  
  constructor(private _snackBar: MatSnackBar,
              private dialog:MatDialog) {

/*     const nuevoMarcador = new Marcador(51.678418,7.809007);
    this.marcadores.push(nuevoMarcador); */
    //si encuentra marcadores guardados
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
   }

  ngOnInit() {
  }

  agregarMarcador( evento){
    //console.log(evento.coords.lat);
    const coords:{ lat:number, lng:number } = evento.coords;
    const nuevoMarcador = new Marcador (coords.lat, coords.lng);
    this.marcadores.push( nuevoMarcador);
    this.guardarStorage();
    this._snackBar.open('Marcador Agregado', 'cerrar',{duration:3000});
  }

  borrarMarcador(i:number){
    //console.log(i);
    this.marcadores.splice(i,1);
    this.guardarStorage();
    this._snackBar.open('Marcador eliminado', 'cerrar',{duration:3000});
  }

  editarMarcador( marcador:Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo:marcador.titulo, desc: marcador.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(!result){
        return;
      }
      marcador.titulo=result.titulo;
      marcador.descripcion=result.desc;
      this.guardarStorage();
      this._snackBar.open('Marcador actualizado', 'cerrar',{duration:2000});
    });
  
  }

  guardarStorage(){

    localStorage.setItem('marcadores',JSON.stringify(this.marcadores));
  }

}
