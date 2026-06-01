# webdev_rpg

Checar database:
```bash
php -m | grep pdo_mysql && sudo mariadb -u root -e "SHOW TABLES IN db_webrpg;"
php -m | grep pdo_mysql && sudo mariadb -u root -e "USE db_webrpg; SELECT * FROM Scores;"
```

Terminal backend:
```bash
cd backend
php yii serve --port=8080 --docroot=web
```

Terminal frontend:
```bash
cd frontend
npm run dev -- --host
```