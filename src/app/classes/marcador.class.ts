/* export class Marcador{
    constructor ( public lat: number, public lng: number){}
} */

// es necesario el nombre export para poderla utilizar en otro archivo.
export class Marcador{

    public lat: number;
    public lng: number;
    public titulo: string ='Sin titulo';
    public descripcion ='Sin descripcion';

    constructor( lat:number, lng:number){
        this.lat = lat;
        this.lng = lng;
    }
}