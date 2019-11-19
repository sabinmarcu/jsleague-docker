
#!/bin/bash

SCD=$(cd `dirname $0`;pwd)
ROOT=$(cd $SCD/../;pwd)

for file in $ROOT/slides/*.mdx; do 
  node $SCD/annotate.js $file
  echo "---"
done > $ROOT/decks/index.mdx
echo "\n# Thank you!" >> $ROOT/decks/index.mdx