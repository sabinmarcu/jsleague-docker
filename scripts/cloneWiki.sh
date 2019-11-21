#!/bin/bash

SCD=$(cd `dirname $0`;pwd)
ROOT=$(cd $SCD/../;pwd)
REMOTE="git@$(git remote -v | head -n 1 | cut -d "@" -f 2 | cut -d "." -f 1,2).wiki.git"

cd $ROOT
rm -rf wiki
git clone $REMOTE wiki