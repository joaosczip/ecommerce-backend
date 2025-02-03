docker volume create pgdata && \
    docker run \
        --name ecomm-be-pg \
        --restart always \
        -e PGDATA=/var/lib/postgresql/data/pgdata \
        -v pgdata:/var/lib/postgresql/data \
        -e POSTGRES_USER=root \
        -e POSTGRES_PASSWORD=root \
        -e POSTGRES_DB=ecomm-be \
        -p 5433:5432 \
        -d \
        postgres:17.2-alpine3.21
