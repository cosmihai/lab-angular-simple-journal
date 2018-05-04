import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

// components--------

import { AppComponent } from './app.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
// services---
import { JournalService } from './services/journal.service';

// routes----
const routes: Routes = [
  { path: 'journal-entries', component: EntryListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [JournalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
