-include .env

.DEFAULT_GOAL := help

MAKEFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CWD := $(dir $(MAKEFILE_PATH))

dc\:up: ## Start the project
	docker-compose up -d --build

dc\:down: ## Down the project
	docker-compose down

dc\:adhmapi: ## Run bash in docker adhmapi container (alias: adhmapi)
	docker-compose exec -u adhm_user adhmapi bash

dc\:adhm: ## Run bash in docker adhm container (alias: adhm)
	docker-compose exec -u adhm_user adhm bash

adhmapi:
	make dc:adhmapi

adhm:
	make dc:adhm

dc\:adhm\:lint: ## Run yarn lint --fix in docker adhm container
	docker-compose exec -u adhm_user adhm yarn lint --fix

ssl-generate: ## Generate the SSL certificate and CA
	docker run -v $(CWD)docker/traefik/certs:/root/.local/share/mkcert goodeggs/mkcert -cert-file /root/.local/share/mkcert/local-cert.pem -key-file /root/.local/share/mkcert/local-key.pem "$(DOMAIN)" "*.$(DOMAIN)"
	openssl x509 -in docker/traefik/certs/rootCA.pem -inform PEM -out docker/traefik/certs/rootCA.crt

githooks-enable: ## Enable git hooks
	git config core.hooksPath .githooks

githooks-disable: ## Disable git hooks
	git config core.hooksPath .git/hooks

.PHONY: help

help:
	@grep -E '^[a-zA-Z_\\\:-]+:.*?## .*$$' Makefile | sed 's/\\//g' | awk 'BEGIN {FS = ": *?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


