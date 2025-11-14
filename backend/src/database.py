from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import time
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configurações do PostgreSQL
POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres123")
POSTGRES_SERVER = os.getenv("POSTGRES_SERVER", "postgres")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
POSTGRES_DB = os.getenv("POSTGRES_DB", "blog_db")

# URL de conexão do PostgreSQL
SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

# Tentar conectar ao banco com retry
def create_engine_with_retry():
    for i in range(10):
        try:
            engine = create_engine(
                SQLALCHEMY_DATABASE_URL,
                pool_pre_ping=True,
                pool_recycle=300,
            )
            # Testar conexão
            with engine.connect() as conn:
                logger.info("Conectado ao PostgreSQL com sucesso!")
            return engine
        except Exception as e:
            logger.warning(f"Tentativa {i+1}/10 - Falha ao conectar com PostgreSQL: {e}")
            time.sleep(5)
    
    raise Exception("Não foi possível conectar ao PostgreSQL após 10 tentativas")

# Criar engine do SQLAlchemy
engine = create_engine_with_retry()

# Criar SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()

def get_db():
    """
    Dependency para obter sessão do banco de dados
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """
    Criar todas as tabelas no banco de dados
    """
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Tabelas criadas/verificadas com sucesso!")
    except Exception as e:
        logger.error(f"Erro ao criar tabelas: {e}")
        raise