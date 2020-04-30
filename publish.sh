#!/bin/bash
set -e

echo "删除旧dist文件"
rm -rf dist

echo "打包SSR服务器端"
export WEBPACK_TARGET=node && ./node_modules/.bin/vue-cli-service build

echo "将服务器端Json文件移出dist"
mv dist/vue-ssr-server-bundle.json bundle

echo "打包SSR客户端"
export WEBPACK_TARGET=web && ./node_modules/.bin/vue-cli-service build

echo "将服务器端Json文件移回dist"
mv bundle dist/vue-ssr-server-bundle.json