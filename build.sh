npm install @angular/cli -g
npm install tsc-watch -g

#!/usr/bin/env bash

git clone https://github.com/marcing20067/angular-shop.git ./frontend

cd frontend

npm install --include=dev

ng build