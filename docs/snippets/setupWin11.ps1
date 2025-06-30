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

scoop install docker
scoop install python
scoop install doxygen
scoop install graphviz
scoop install ffmpeg

scoop install starship
scoop install posh-git
scoop install eza

scoop install googlechrome
scoop install zoom

scoop install rufus
scoop install crystaldiskinfo
scoop install crystaldiskmark
scoop install gpu-z

scoop install obsidian
scoop install vim
scoop install edit
scoop install mery
scoop install vscode
