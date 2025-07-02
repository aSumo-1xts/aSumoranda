# scoopのインストール
irm get.scoop.sh | iex

# gitのインストール
# Extrasを引っ張ってくるために必要なので順番が先
scoop install git

# Scoop Extrasを予め引っ張ってくる
scoop bucket add extras

# 基本的なもの
scoop install aria2
scoop install curl
scoop install wget

# プログラミング言語
scoop install python

# 開発環境と各種ツール
scoop install docker
scoop install doxygen
scoop install graphviz
scoop install ffmpeg

# ターミナル
scoop install starship
scoop install posh-git
scoop install eza

# エディタ
scoop install vim
scoop install edit

# 診断ツール
scoop install rufus
scoop install crystaldiskinfo
scoop install crystaldiskmark
scoop install gpu-z
