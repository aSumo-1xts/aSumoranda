# scoopのインストール
irm get.scoop.sh | iex

# gitのインストール
# Extrasを引っ張ってくるために必要なので順番が先
scoop install git

# Scoop Extrasを予め引っ張ってくる
scoop bucket add extras

# iyokan-jpも引っ張ってくる
scoop bucket add iyokan-jp https://github.com/tetradice/scoop-iyokan-jp

# 各種ツールをインストール
scoop install aria2
scoop install curl
scoop install wget
scoop install gsudo

scoop install posh-git
scoop install oh-my-posh
scoop install Terminal-Icons

scoop install python

scoop install googlechrome
scoop install docker
scoop install obsidian

scoop install rufus
scoop install crystaldiskinfo
scoop install crystaldiskmark
scoop install gpu-z

scoop install vim
scoop install mery
scoop install vscode