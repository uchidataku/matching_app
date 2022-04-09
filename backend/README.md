# Rails / REST API BoilerPlate
## サーバー構築手順
1. .envを作成し、.env.sampleの中身をコピペする
2. `docker-compose build` もしくは `make build`
3. `docker-compose up -d` もしくは `make up`
4. `docker-compose exec app rails db:create` もしくは `make db_create`
5. `docker-compose exec app rails db:migrate` もしくは `make db_migrate`

### ※ credentialについて
Multi Environment Credentialsを採用しています。  
.env.sampleのRAILS_MASTER_KEYにある値は、development.keyの値になっています。
