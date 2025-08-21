# Генератор паролів (Angular)

Простий Angular-додаток для генерації випадкових паролів з опціями:
- довжина
- включати цифри
- включати символи
- виклик **API Ninjas** з fallback на локальний генератор
- кнопка копіювання у буфер обміну

## Швидкий старт
1. Встанови залежності:
   ```bash
   npm install
   ```
2. Додай ключ API Ninjas у `src/environments/environment.ts` (поле `apiNinjasKey`). Отримати ключ: https://api-ninjas.com/
3. Запусти у дев-режимі:
   ```bash
   npm start
   ```
4. Відкрий `http://localhost:4200/`

> Якщо ключа немає або API недоступне — пароль згенерується локально.

## Структура
- `src/app/services/password.service.ts` — виклик API Ninjas
- `src/app/components/password-generator/*` — UI та логіка
- `src/main.ts` — standalone bootstrap без модулів

## Нотатки
- Мінімальні залежності під Angular 17
- Строгий TypeScript
