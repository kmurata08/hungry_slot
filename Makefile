include .env

setup:
	npm install

run:
	npm run start

build:
	npm run build

deploy:
	lftp -d -u $(FTP_USER),$(FTP_PASS) $(FTP_HOST) -e "mirror --reverse --delete --only-newer $(FTP_SRC_DIR) $(FTP_TARGET_DIR);exit"
