import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { RespuestaTopHeadlines, Article } from '../../interfaces/interfaces'
import { HTTP } from '@ionic-native/http/ngx'
import { AlertController } from '@ionic/angular';
import { cordova, Cordova } from '@ionic-native/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];
  ip: string;

  constructor(
    private noticiasService: NoticiasService,
    private http: HTTP,
    private alert: AlertController
    ) {}
  
  ngOnInit(){
    // this.cargarNoticias();

  }

  peticion(){
    this.http.get(this.ip,null,null).then(
      data => {
        console.log(data.data);
        this.presentAlert(data.data)
      }
    ).catch(
      error =>{
        this.presentAlert(<any>error)
    })
  }

  async presentAlert(mensaje) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  loadData(event){

    console.log(event);
    this.cargarNoticias( event );
  }

  cargarNoticias( event? ){
    this.noticiasService.getTopHeadlines()
    .subscribe( (resp) => {
      console.log('noticias', resp);

      if( resp.articles.length == 0 ){
        event.target.disabled = true;
        return;
      }
      
      this.noticias.push(...resp.articles);

      if( event ){
        event.target.complete();
      }   
    });
  }
}
