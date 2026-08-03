create table if not exists "roles" (
    id varchar(16) primary key default gen_random_uuid(),
    description varchar(256)
);

create table if not exists "users" (
    id UUID primary key default gen_random_uuid(),
    role_id varchar(16) not null,
    first_name varchar(32) not null,
    last_name varchar(32) not null,
    email varchar(32) not null,
    phone varchar(32) not null,
    address varchar(128) not null,
    photo_url varchar(256) not null,
    position varchar(32) not null,
    summary varchar(1024) not null,
    password varchar(256) not null
);

create unique index on "users" (email);
  
alter table "users"
add foreign key (role_id) references roles(id);

create table if not exists "attributes" (
    id UUID primary key default gen_random_uuid(),
    category_id UUID not null,    
    type varchar(100) not null, 
    "values" varchar(100)[], 
    name varchar(128) not null 
 );

create table if not exists categories (
    id UUID primary key default gen_random_uuid(),
    "value" varchar(100) not null    
 );

alter table attributes
add foreign key (category_id) references categories(id);

create table if not exists user_attributes (
    user_id UUID not null,
    attribute_id UUID not null,
    "value" varchar(100) not null,
    primary key (attribute_id, user_id)
);

alter table user_attributes
add foreign key (attribute_id) references attributes(id),
add foreign key (user_id) references users (id);

create table if not exists tags (
    id UUID primary key default gen_random_uuid(),
    value varchar(256) not null  
);

create table if not exists position (
    id UUID primary key default gen_random_uuid(),
    name varchar(256) not null,
    description varchar(1024) not null
);

create table if not exists position_tags (
    position_id UUID not null,
    tags_id UUID not null,
    primary key(position_id, tags_id)
 );

alter table position_tags
add foreign key (position_id) references position(id),
add foreign key (tags_id) references tags(id);

create table if not exists position_attributes (   
    position_id UUID not null,
    attribute_id UUID not null,
    primary key(position_id, attribute_id)
);

alter table position_attributes
add foreign key (position_id) references position(id),
add foreign key (attribute_id) references attributes(id);

create table if not exists position_users (
    position_id UUID not null,
    user_id UUID not null,
    primary key(position_id, user_id)
);

alter table position_users
add foreign key (position_id) references position(id),
add foreign key (user_ID) references users(id);

insert into roles (id, description)
values 
    ('ADMIN', 'Can manage all pages'),
    ('RECRUITER', 'Can manage position and attribtes'),
    ('CANDIDATE', 'Can manage own profile, apply to positions');


insert into categories (value)
values 
    ('Certification'),
    ('Domain Knowledge'),
    ('Personal Information'),
    ('Soft Skills');

create table if not exists projects (
    id UUID primary key default gen_random_uuid(),
    user_id UUID not null,
    name varchar(256) not null,
    description varchar(1024) not null,
    start_date varchar(256) not null,
    end_date varchar(256) not null
);

alter table projects
add foreign key (user_id) references users(id);

create table if not exists projects_tags (
    project_id UUID not null,
    tag_id UUID not null,
    primary key(project_id, tag_id)
);

alter table projects_tags
add foreign key (project_id) references projects(id),
add foreign key (tag_id) references tags(id);