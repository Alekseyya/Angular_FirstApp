import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent  implements OnInit{
  myForm : FormGroup;


  constructor(private httpService: HttpService) {
    this.myForm = new FormGroup({
      "firstName": new FormControl("", [
        Validators.required,
      Validators.pattern("^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$")]
    ),
      "lastName": new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$")
      ])      
    });
  }

  ngOnInit() {
    this.httpService.GetClients().subscribe((data: Client[]) => {
      for (let client of data)
        this.clients.push(new Client(client.FirstName, client.LastName));
      });
  }
  

  client: Client;

  clients: Client[] = [];  
 
  Submit() {
    var clientFirstName = this.myForm.controls.firstName.value;
    var clientLastName = this.myForm.controls.lastName.value;
    var newClient = new Client(clientFirstName, clientLastName);    
    this.httpService.AddClient(newClient).subscribe((data: Client) => {
      this.clients.push(newClient);
    });
  }

  

  public AddClient(firstName: string, lastName: string): void {    
       
    this.clients.push(new Client(firstName, lastName));
  }

  OnFirstNameChange():void{
    if(this.client.FirstName=="111")
      console.log("Stop!!")
  }

  ChangeColor(client:Client):void{
    var colorR = Math.floor((Math.random() * 255));
    var colorG = Math.floor((Math.random() * 255));
    var colorB = Math.floor((Math.random() * 255));
    var color = "rgb("+ colorR + ","+ colorG + "," + colorB + ")";

    var liClients = document.querySelectorAll("ul>li");

    for (let li = 0; li < liClients.length; li++) {
      var clientFirstName = liClients[li].getElementsByClassName('list-clients__item-firstname')[0].innerHTML;
      var clientLastName = liClients[li].getElementsByClassName('list-clients__item-lastname')[0].innerHTML;
      if (clientFirstName == client.FirstName && clientLastName == client.LastName) {
        liClients[li].getElementsByClassName('list-clients__item-firstname')[0].style.backgroundColor = color;
        liClients[li].getElementsByClassName('list-clients__item-lastname')[0].style.backgroundColor = color;
      }
    }  
  }

  DeleteClient(client: Client): void{
    console.log(client.FirstName,client.LastName);
    //delete on db
    this.httpService.DeleteClient(client).subscribe((data: Client) => {
      var indexDeleteClient = this.clients.indexOf(client,0);
      this.clients.splice(indexDeleteClient,1);
    });
    
    //delete on ul
    for(let cl of this.clients){
      if(cl.FirstName == client.FirstName && cl.LastName== client.LastName){        
        let indexOfListClients =this.clients.indexOf(cl,0);
        this.clients.splice(indexOfListClients,1)
      }
    }  
  }


}

export class Client{
  FirstName: string;
  LastName: string;     
  
  constructor(firstName: string, lastName: string) {

      this.FirstName = firstName;
      this.LastName = lastName;
  }
  
}


