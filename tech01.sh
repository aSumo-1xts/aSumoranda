# !/bin/sh

git reset --soft HEAD^

git add .

git commit -m "update: 記事を追加"

git push -f origin tech01
