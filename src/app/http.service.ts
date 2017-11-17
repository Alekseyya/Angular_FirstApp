import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Client } from './app.component';
  
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }

    ClientsUrl:string = "http://localhost:8082/MyAPI/api/values";

    GetClients(){
        return this.http.get(this.ClientsUrl + "/get");
    }
    DeleteClient(client: Client){
        var newDeleteClient = {FirstName: client.FirstName, LastName: client.LastName};
        return this.http.post(this.ClientsUrl + "/deleteclient", newDeleteClient); 
    }
    AddClient(client: Client){
        var newClient = {FirstName: client.FirstName, LastName: client.LastName};
        return this.http.post(this.ClientsUrl + "/addclient", newClient); 
    }    
}