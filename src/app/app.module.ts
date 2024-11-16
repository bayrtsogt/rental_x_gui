import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AboutComponent} from "./about/about.component";
import {TopbarComponent} from "./layout/topbar/topbar.component";
import {LoadingComponent} from "./loadingComponent/loading.component";
import {LoginComponent} from "./login/login.component";
import {AddVehicleComponent} from "./owner/addVehicle/addVehicle.component";
import {DashboardComponent} from "./owner/dashboard/dashboard.component";
import {PhotoUploadComponent} from "./photo-upload/photo-upload.component";
import {RegisterComponent} from "./register/register.component";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DockModule} from "primeng/dock";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {AppRoutingModule} from "./app-routing.module";
import {LoadingInterceptor} from "./loading.interceptor";
import {SpeedDialModule} from "primeng/speeddial";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MenuModule} from "primeng/menu";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TenantDashboardComponent} from "./tenant/dashboard/tenant-dashboard.component";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TopbarComponent,
    LoadingComponent,
    LoginComponent,
    AddVehicleComponent,
    DashboardComponent,
    PhotoUploadComponent,
    RegisterComponent,
    TenantDashboardComponent
  ],
  imports: [
    BrowserModule,  // Only in the root module
    HttpClientModule,
    RouterModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ChipsModule,
    FormsModule,
    BrowserAnimationsModule,
    DockModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
    ProgressSpinnerModule,
    InputTextModule,
    SharedModule,
    AppRoutingModule,
    SpeedDialModule,
    ToggleButtonModule,
    MenuModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    ScrollPanelModule,
    CarouselModule,
    TagModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
