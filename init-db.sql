-- Script de inicialização do banco de dados
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar schema adicional se necessário
CREATE SCHEMA IF NOT EXISTS blog;

-- Comentários sobre o banco
COMMENT ON DATABASE blog_db IS 'Banco de dados para a aplicação de Blog';