source "$(pwd -P)/.env"

scp -r ./build dockerfile $SERVER_USER@$SERVER_HOST:$SERVER_DEPLOY_PATH
