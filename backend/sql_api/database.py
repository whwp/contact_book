import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

"""using SQLite for local testing"""
#db_foldername = './output/'
#os.makedirs(db_foldername, exist_ok=True)
#db_filename = db_foldername + "data.db"
#SQLALCHEMY_DATABASE_URL = f'sqlite:///{db_filename}'
#engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}, echo=False)

"""using PostgreSQL on supabase"""
db_password = os.environ.get("DB_PASSWORD")
db_reference_id = os.environ.get("DB_REFERENCE_ID")

SQLALCHEMY_DATABASE_URL = f'postgresql://postgres:{db_password}@db.{db_reference_id}.supabase.co:5432/postgres'
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()