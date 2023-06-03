import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-food/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home/home.component';
import {MatCardModule} from "@angular/material/card";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { RegisterComponent } from './form-login/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './form-login/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './nav-food/footer/footer.component';
import { ProductComponent } from './product/product.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import { CartComponent } from './cart/cart.component';
import {MatListModule} from "@angular/material/list";
import { IntroduceComponent } from './introduce/introduce.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';
import {RatingModule} from 'ng-starrating';
import {NgxPaginationModule} from 'ngx-pagination';
import {DialogConfirmModule} from "./dialog-confirm/dialog-confirm.module";
import {DialogConfirmComponent} from "./dialog-confirm/dialog-confirm.component";


const appRoutes: Routes = [
  {path:'',redirectTo:'home', pathMatch:"full"},
  {path:'home', component:HomeComponent},
  {path:'search/:searchItem ', component:HomeComponent},
  {path:'introduce', component:IntroduceComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent, pathMatch:"full"},
  {path:'product', component:ProductComponent},
  {path:'product/:id', component:ProductViewDetailsComponent},
  {path:'cart', component:CartComponent},
  {path:'Category', component:ProductCategoryComponent},
];
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    ProductComponent,
    ProductViewDetailsComponent,
    CartComponent,
    IntroduceComponent,
    ProductCategoryComponent,
    DialogConfirmComponent
  ],
    imports: [
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        MatInputModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatCardModule,
        RouterOutlet,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatTableModule,
        MatMenuModule,
        MatListModule,
        NgbModule,
        NgxStarRatingModule,
        RatingModule,
        NgxPaginationModule
    ],
  providers: []
})
export class AppModule { }
