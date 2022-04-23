run:
	docker-compose up -d \
	&& docker-compose run queso rake db:rollback \
	&& docker-compose run queso rake db:migrate
