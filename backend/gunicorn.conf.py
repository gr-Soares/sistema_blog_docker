import multiprocessing
import os

# Configurações do Gunicorn
bind = "0.0.0.0:8000"
workers = int(os.getenv("GUNICORN_WORKERS", multiprocessing.cpu_count() * 2 + 1))
worker_class = "uvicorn.workers.UvicornWorker"

# Configurações de logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# Configurações de timeout
timeout = 120
keepalive = 5

# Configurações de segurança
limit_request_line = 4096
limit_request_fields = 100

# Pré-carregar a aplicação
preload_app = True

# Configurações específicas para produção
max_requests = 1000
max_requests_jitter = 100