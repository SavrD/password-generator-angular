import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PasswordGeneratorComponent } from './app/components/password-generator/password-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PasswordGeneratorComponent],
  template: `<app-password-generator></app-password-generator>`
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule, FormsModule)]
}).catch(err => console.error(err));
