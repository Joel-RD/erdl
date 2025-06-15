-- Create datbase if not exits
CREATE DATABASE shortener;

CREATE TABLE url_shortener (
    id SERIAL PRIMARY KEY,
    short_url VARCHAR(50) UNIQUE NOT NULL,
	url_id varchar(50) unique not null,
    original_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    clicks INTEGER DEFAULT 0
);
