import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard} from './auth.guard';
import { CarouselComponent } from './carousel/carousel.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CartComponent } from './cart/cart.component';
/*const appRoutes: Routes =[
 {path:}
]*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagingService } from './messaging.service';
import { AsyncPipe } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    HeaderComponent,
    DetailsComponent,
    CarouselComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('../ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule, BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthGuard, MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

