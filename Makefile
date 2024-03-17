docker-down:
	docker-compose down --remove-orphans
docker-up:
	docker-compose up -d --remove-orphans

app-start:
	docker-compose run --rm -p "3000:3000" node npm start

app-build:
	docker-compose run --rm node npm run build

ci-build:
	docker-compose run --rm node npm i
	docker-compose run --rm node npm run build

init: docker-down docker-up app-start