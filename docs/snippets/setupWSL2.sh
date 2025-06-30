# curlで入れるもの
curl https://mise.run | sh
curl -LsSf https://astral.sh/uv/install.sh | sh
curl -sS https://starship.rs/install.sh | sh

# zshとZinit
sudo apt install zsh # zshをインストール
chsh -s $(which zsh) # デフォルトシェルをzshに変更
# Zinitをインストール
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
exec zsh                                      # zshを再起動
zinit self-update                             # Zinitを準備
zinit light zsh-users/zsh-autosuggestions     # zsh-autosuggestionsをインストール
zinit light zsh-users/zsh-completions         # zsh-completionsをインストール
zinit light zsh-users/zsh-syntax-highlighting # zsh-syntax-highlightingをインストール

# zshrcを再読み込み
source ~/.zshrc

# uvで入れるもの
uv tool install ruff@latest
