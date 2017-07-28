import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router';;
//Angular Materials//
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';
// ------------------ //

import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';

const routes: Routes = [
    {path: '**', component: HomepageComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdCheckboxModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
