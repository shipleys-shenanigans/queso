nuke:
	docker-compose run backend rake db:rollback db:migrate db:seed

run:
	docker-compose up -d --build

run_and_migrate:
	docker-compose up -d --build \
	&& docker-compose run backend rake db:migrate
