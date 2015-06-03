drop table if exists users;
create table users (
  id integer primary key autoincrement,
  username text not null,
  password text not null
);

create table notes (
  id integer primary key autoincrement,
  book_id integer not null,
  user_id integer not null,
  title text not null,
  content content not null,
  creation_ts float not null
);

create table books (
  id integer primary key autoincrement,
  user_id integer not null,
  name text not null,
  creation_ts float not null
);
