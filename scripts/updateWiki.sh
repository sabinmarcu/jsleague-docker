#!/bin/bash

SCD=$(cd `dirname $0`;pwd)
ROOT=$(cd $SCD/../;pwd)

cd $ROOT/wiki

git add .
git commit -am "Updated wiki on `date '+%d/%m/%Y'` at `date '+%H:%M'`"
git push

cd $ROOT 
rm -rf wiki