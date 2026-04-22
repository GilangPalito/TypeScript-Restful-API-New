podman --version

# Cek semua container yg sedang jalan
podman ps

# Install images dari Docker Hub
podman pull postgres:alpine3.22

# Cek semua images yg sudah di install
podman images

# Hapus image yang ada di list
podman rmi -f imageIDnya

# Jalankan images ke dalam sebuah container
podman run namarepository

# Cara run images Postgres
podman run -d --name my-postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  docker.io/library/postgres:alpine3.22

