include .env
export $(shell sed 's/=.*//' .env)

build:
	docker-compose \
		-f docker-compose.development.yml \
		build \
			--build-arg PORT=$(PORT) \
			$(opts)

shell:
	docker exec -it express-ddd-service

up:
	docker-compose -f docker-compose.development.yml run --service-ports --name express-ddd-service express-ddd; docker-compose -f docker-compose.development.yml down --remove-orphans
