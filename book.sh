# !/bin/sh

git reset --soft HEAD^

git add .

git commit -m "update: 記事を編集"

git push -f origin book
