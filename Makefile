
VERSION := $(shell git describe --tags --always --match='v*')

.PHONY: build
build:
	@yarn build .


.PHONY: image.build
image.build: build
	@docker build -t registry.cn-qingdao.aliyuncs.com/haotuanzhushou/admin:$(VERSION) .