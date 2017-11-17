import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { MyColorDirective} from './myColor.directive';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    MyColorDirective    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
