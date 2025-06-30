# 先に実行する
. "$HOME/.local/bin/env"

# miseの初期化
eval "$(~/.local/bin/mise activate zsh)"

# uv, uvx
eval "$(uv generate-shell-completion zsh)"
eval "$(uvx --generate-shell-completion zsh)"

# Starshipの初期化
eval "$(starship init zsh)"
