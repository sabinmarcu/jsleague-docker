
#!/bin/bash

SCD=$(cd `dirname $0`;pwd)
ROOT=$(cd $SCD/../;pwd)

cp -R $ROOT/components $ROOT/decks/components
for file in $ROOT/slides/*.mdx; do 
  node $SCD/annotate.js $file
  echo "---"
done | sed \$d > $ROOT/decks/index.mdx