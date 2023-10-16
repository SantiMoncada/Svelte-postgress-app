FROM library/postgres:16

COPY ./sql/init.sql /docker-entrypoint-initdb.d/

RUN chmod +r /docker-entrypoint-initdb.d/init.sql