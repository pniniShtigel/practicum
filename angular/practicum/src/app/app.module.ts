import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app.routes";
import { HomeComponent } from "./components/home/home.component";


@NgModule({
    declarations: [AppComponent,HomeComponent],
    imports: [BrowserModule, NgModule, FormsModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
    bootstrap: [AppComponent],
    providers:[provideClientHydration(),provideClientHydration()]

})
export class AppModule {
}

