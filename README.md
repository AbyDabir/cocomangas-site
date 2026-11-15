# CoCoMangas — электронное меню

## Ссылки после публикации на GitHub Pages

Замените `USER` и `REPO` на свой логин и имя репозитория:

- Меню: `https://USER.github.io/REPO/menu/`
- Терминал: `https://USER.github.io/REPO/terminal/`
- Админка: `https://USER.github.io/REPO/admin/` (пароль: `coco2026`)

## Firebase

В трёх файлах вставьте **один и тот же** конфиг:

- `menu/js/firebase-config.js`
- `admin/js/firebase-config.js`
- `terminal/js/firebase-config.js`

Нужны поля из Firebase Console + `databaseURL` из Realtime Database.

## GitHub Pages

1. Settings → Pages  
2. Source: Deploy from a branch  
3. Branch: `main`, folder: `/ (root)`  
4. Save  
