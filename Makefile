build:
	docker build -t telegram-gpt .

run:
	docker run -d -p 3000:3000 --name telegram-gpt --rm telegram-gpt