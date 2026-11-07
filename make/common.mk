SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help
INFO := \033[36m
NO := \033[m
ENV ?= dev

.PHONY: help
help: ## shows this help
	@grep -Eh '^[a-zA-Z0-9_-]+:.*## .*$$' $(MAKEFILE_LIST) | sort | awk -v info='$(INFO)' -v no='$(NO)' -f ./awk/display.awk
