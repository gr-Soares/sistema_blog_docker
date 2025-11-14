from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

import src.models as models
import src.schemas as schemas
from src.database import get_db, create_tables

create_tables()

app = FastAPI(
    title="Blog API",
    description="Uma API completa para gerenciamento de posts em um blog",
    version="1.0.0"
)

# CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do Blog!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API está funcionando"}

@app.post("/posts/", response_model=schemas.PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    db_post = models.Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/posts/", response_model=List[schemas.PostResponse])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = db.query(models.Post).offset(skip).limit(limit).all()
    return posts

@app.get("/posts/{post_id}", response_model=schemas.PostResponse)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return db_post

@app.put("/posts/{post_id}", response_model=schemas.PostResponse)
def update_post(post_id: int, post: schemas.PostUpdate, db: Session = Depends(get_db)):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    update_data = post.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@app.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    db.delete(db_post)
    db.commit()
    return None

@app.get("/posts/search/{title}", response_model=List[schemas.PostResponse])
def search_posts_by_title(title: str, db: Session = Depends(get_db)):
    posts = db.query(models.Post).filter(models.Post.title.ilike(f"%{title}%")).all()
    return posts

@app.get("/posts/author/{author}", response_model=List[schemas.PostResponse])
def get_posts_by_author(author: str, db: Session = Depends(get_db)):
    posts = db.query(models.Post).filter(models.Post.author == author).all()
    return posts