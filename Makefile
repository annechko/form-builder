docker-down:
	docker-compose down --remove-orphans

start:
	docker-compose run --rm -p "3000:3000" fb-node npm start

app-install:
	docker-compose run --rm fb-node npm i

ci-build:
	docker-compose run --rm fb-node npm i
	docker-compose run --rm fb-node npm run build

init: docker-down app-install start