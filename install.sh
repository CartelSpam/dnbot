#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install -y nodejs libwebp ffmpeg wget tesseract
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm install

echo "\n\n ->  TODAS AS DEPENDÊNCIAS FORAM INSTALADAS USE O COMANDO \"npm start\" PARA INICIAR O BOT\n\n"
