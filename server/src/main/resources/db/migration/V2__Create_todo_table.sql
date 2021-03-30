CREATE TABLE to_do (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    description varchar(255),
    is_complete boolean not null DEFAULT false,
    due_date date,
    user_name varchar(255)
);