import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { MatDialogModule } from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatGridListModule } from '@angular/material/grid-list';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatListModule } from '@angular/material/list';
  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  import { MatRadioModule } from '@angular/material/radio';
  import { MatSelectModule } from '@angular/material/select';
  import { MatSlideToggleModule } from '@angular/material/slide-toggle';
  import { MatSliderModule } from '@angular/material/slider';
  import { MatToolbarModule } from '@angular/material/toolbar';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule  } from '@angular/common/http'; //do you need both?
import { baseURL } from './shared/baseurl';

import 'hammerjs';

//
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

      MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
      MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
      MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
      MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule,
      FlexLayoutModule, MatDialogModule, MatFormFieldModule,  MatInputModule,
      MatCheckboxModule,

    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
        LoginComponent
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    { provide: 'BaseURL', useValue: baseURL },
    ProcessHTTPMsgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
