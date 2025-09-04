CREATE TABLE subscription_plan (
    subscription_plan_id INTEGER PRIMARY KEY,
    name                 TEXT    NOT NULL,
    price                DOUBLE,
    duration_mouths      TEXT,
    user_limit           INTEGER,
    devices_limit        INTEGER
);

CREATE TABLE users_authentication (
    user_id              INTEGER PRIMARY KEY,
    email                TEXT    UNIQUE,
    password_hash        TEXT,
    type_account         TEXT    CHECK (type_account IN ('user', 'admin') ),
    short_links_id       INTEGER,
    subscription_plan_id INTEGER,
    created_at           TEXT    DEFAULT (datetime('now', 'localtime') ),
    FOREIGN KEY (
        subscription_plan_id
    )
    REFERENCES subscription_plan (subscription_plan_id),
    FOREIGN KEY (
        short_links_id
    )
    REFERENCES short_links (short_links_id) 
);

CREATE TABLE short_links (
    short_links_id INTEGER  PRIMARY KEY,
    original_url   TEXT     NOT NULL,
    short_code     TEXT     NOT NULL
                            UNIQUE,
    short_url      TEXT     NOT NULL
                            UNIQUE,
    clicks         INTEGER  DEFAULT 0,
    expires        DATETIME,
    created_at     TEXT     DEFAULT (datetime('now', 'localtime') ) 
);
