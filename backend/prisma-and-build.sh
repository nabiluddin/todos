#!/bin/env sh
set -ex

npx prisma generate
npx prisma migrate deploy

npx ncc build src/index.ts -o dist

engine_file="./dist/client/libquery_engine-linux-musl-openssl-3.0.x.so.node"
destination_path="./dist/libquery_engine-linux-musl-openssl-3.0.x.so.node"
cp "$engine_file" "$destination_path"

rm -rf ./dist/client
