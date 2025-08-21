import { Component } from '@angular/core';
import { PasswordService } from '../../services/password.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent {
  length = 12;
  includeNumbers = true;
  includeSymbols = true;
  password = '';
  loading = false;
  error: string | null = null;

  constructor(private passwordService: PasswordService) {}

  generate() {
    this.loading = true;
    this.error = null;
    this.passwordService.generatePassword(this.length, this.includeNumbers, this.includeSymbols)
      .subscribe({
        next: (res) => {
          this.password = res.random_password || '';
          this.loading = false;
          if (!this.password) {
            this.password = this.generateLocalPassword();
          }
        },
        error: () => {
          console.warn('API недоступне, генеруємо локально');
          this.password = this.generateLocalPassword();
          this.loading = false;
        }
      });
  }

  generateLocalPassword(): string {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (this.includeNumbers) chars += '0123456789';
    if (this.includeSymbols) chars += '!@#$%^&*()_-+=<>?/{}~|';
    if (!chars) return '';

    let pass = '';
    for (let i = 0; i < this.length; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(idx);
    }
    return pass;
  }

  async copyToClipboard() {
    if (!this.password) return;
    try {
      await navigator.clipboard.writeText(this.password);
      alert('Пароль скопійовано!');
    } catch {
      this.fallbackCopy(this.password);
    }
  }

  private fallbackCopy(text: string) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('Пароль скопійовано!');
  }
}
