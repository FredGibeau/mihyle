import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FrostboltModule } from './modules/frostbolt/frostbolt.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    FrostboltModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
