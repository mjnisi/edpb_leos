--
-- Copyright 2021 European Commission
--
-- Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
-- You may not use this work except in compliance with the Licence.
-- You may obtain a copy of the Licence at:
--
--     https://joinup.ec.europa.eu/software/page/eupl
--
-- Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the Licence for the specific language governing permissions and limitations under the Licence.
--

------------------------------------
-- Oracle database creation scripts
--
-- last modified 29.05.2020/ANOT-126
------------------------------------

------------------------------------
-- USERS
-- requires sequence, table, index
--  and trigger
------------------------------------
DROP SEQUENCE "USERS_SEQ";

CREATE SEQUENCE "USERS_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "USERS" (
  "USER_ID" NUMBER NOT NULL ENABLE, 
  "LOGIN" VARCHAR2(30 BYTE) NOT NULL ENABLE, 
  "CONTEXT" VARCHAR2(50 BYTE), 
  "SIDEBAR_TUTORIAL_DISMISSED" NUMBER(1,0) DEFAULT 0 NOT NULL ENABLE, 
  CONSTRAINT "USERS_PK" PRIMARY KEY ("USER_ID") USING INDEX ENABLE, 
  CONSTRAINT "USERS_UK_LOGIN_CONTEXT" UNIQUE ("LOGIN", "CONTEXT") USING INDEX ENABLE
);

COMMENT ON COLUMN "USERS"."USER_ID" IS 'Internal user ID';
COMMENT ON COLUMN "USERS"."LOGIN" IS 'User login name';
COMMENT ON COLUMN "USERS"."CONTEXT" IS 'User context';
COMMENT ON COLUMN "USERS"."SIDEBAR_TUTORIAL_DISMISSED" IS 'Flag indicating whether the small tutorial in the sidebar was closed already';
   
CREATE OR REPLACE TRIGGER "USERS_TRG" 
  BEFORE INSERT ON USERS 
  FOR EACH ROW 
  BEGIN
    <<COLUMN_SEQUENCES>>
    BEGIN
      IF INSERTING AND :NEW.USER_ID IS NULL THEN
        SELECT USERS_SEQ.NEXTVAL INTO :NEW.USER_ID FROM SYS.DUAL;
      END IF;
    END COLUMN_SEQUENCES;
  END;
/
ALTER TRIGGER "USERS_TRG" ENABLE;


------------------------------------
-- GROUPS
-- requires sequence, table, trigger
------------------------------------
DROP SEQUENCE "GROUPS_SEQ";

CREATE SEQUENCE "GROUPS_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "GROUPS" (    
  "GROUP_ID" NUMBER NOT NULL ENABLE, 
  "NAME" VARCHAR2(500 BYTE) NOT NULL ENABLE,
  "DESCRIPTION" VARCHAR2(500 BYTE) NOT NULL ENABLE,
  "DISPLAYNAME" VARCHAR2(500 BYTE) NOT NULL ENABLE,
  "ISPUBLIC" NUMBER(1,0) DEFAULT 1 NOT NULL ENABLE,
  CONSTRAINT "GROUPS_PK" PRIMARY KEY ("GROUP_ID") USING INDEX ENABLE, 
  CONSTRAINT "GROUPS_UK_NAMES" UNIQUE ("NAME", "DISPLAYNAME") USING INDEX ENABLE
);

COMMENT ON COLUMN "GROUPS"."GROUP_ID" IS 'Group ID';
COMMENT ON COLUMN "GROUPS"."NAME" IS 'Internal group ID';
COMMENT ON COLUMN "GROUPS"."DESCRIPTION" IS 'Description of the group''s purpose';
COMMENT ON COLUMN "GROUPS"."DISPLAYNAME" IS 'Nice name shown to the user';
COMMENT ON COLUMN "GROUPS"."ISPUBLIC" IS 'Flag indicating whether group is public';

CREATE OR REPLACE TRIGGER "GROUPS_TRG" 
  BEFORE INSERT ON GROUPS 
  FOR EACH ROW 
  BEGIN
    <<COLUMN_SEQUENCES>>
    BEGIN
      IF INSERTING AND :NEW.GROUP_ID IS NULL THEN
        SELECT GROUPS_SEQ.NEXTVAL INTO :NEW.GROUP_ID FROM SYS.DUAL;
      END IF;
    END COLUMN_SEQUENCES;
  END;
/
ALTER TRIGGER "GROUPS_TRG" ENABLE;


------------------------------------
-- USERS_GROUPS
-- requires sequence, table, trigger, index
------------------------------------
DROP SEQUENCE "USERS_GROUPS_SEQ";

CREATE SEQUENCE "USERS_GROUPS_SEQ" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "USERS_GROUPS" (
  "ID" NUMBER NOT NULL ENABLE, 
  "USER_ID" NUMBER NOT NULL ENABLE, 
  "GROUP_ID" NUMBER NOT NULL ENABLE, 
  CONSTRAINT "USERS_GROUPS_PK" PRIMARY KEY ("ID") USING INDEX ENABLE, 
  CONSTRAINT "USERS_GROUPS_UK_USER_GROUP" UNIQUE ("USER_ID", "GROUP_ID") USING INDEX ENABLE, 
  CONSTRAINT "USERS_GROUPS_FK_GROUPS" FOREIGN KEY ("GROUP_ID") REFERENCES "GROUPS" ("GROUP_ID") ON DELETE CASCADE ENABLE, 
  CONSTRAINT "USERS_GROUPS_FK_USERS" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("USER_ID") ON DELETE CASCADE ENABLE
);

COMMENT ON COLUMN "USERS_GROUPS"."ID" IS 'internal ID';
COMMENT ON COLUMN "USERS_GROUPS"."USER_ID" IS 'ID of the user belonging to a group';
COMMENT ON COLUMN "USERS_GROUPS"."GROUP_ID" IS 'Group ID of the belonging group';

CREATE INDEX "USERS_GROUPS_IX_GROUPS" ON "USERS_GROUPS" ("GROUP_ID");

CREATE OR REPLACE TRIGGER "USERS_GROUPS_TRG" 
  BEFORE INSERT ON USERS_GROUPS 
  FOR EACH ROW 
  BEGIN
    <<COLUMN_SEQUENCES>>
      BEGIN
      IF INSERTING AND :NEW.ID IS NULL THEN
        SELECT USERS_GROUPS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
      END IF;
    END COLUMN_SEQUENCES;
  END;
/
ALTER TRIGGER "USERS_GROUPS_TRG" ENABLE;


------------------------------------
-- DOCUMENTS
-- requires sequence, table, trigger
------------------------------------
DROP SEQUENCE "DOCUMENTS_SEQ";

CREATE SEQUENCE "DOCUMENTS_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "DOCUMENTS" (
  "DOCUMENT_ID" NUMBER NOT NULL ENABLE, 
  "TITLE" VARCHAR2(100 BYTE), 
  "URI" VARCHAR2(500 BYTE) NOT NULL ENABLE, 
  CONSTRAINT "DOCUMENTS_PK" PRIMARY KEY ("DOCUMENT_ID") USING INDEX ENABLE, 
  CONSTRAINT "DOCUMENTS_UK_URI" UNIQUE ("URI") USING INDEX ENABLE
);

COMMENT ON COLUMN "DOCUMENTS"."DOCUMENT_ID" IS 'Internal document ID';
COMMENT ON COLUMN "DOCUMENTS"."TITLE" IS 'Document''s title';
COMMENT ON COLUMN "DOCUMENTS"."URI" IS 'URI of the annotated document';

CREATE OR REPLACE TRIGGER "DOCUMENTS_TRG" 
  BEFORE INSERT ON DOCUMENTS 
  FOR EACH ROW 
  BEGIN
    <<COLUMN_SEQUENCES>>
    BEGIN
      IF INSERTING AND :NEW.DOCUMENT_ID IS NULL THEN
        SELECT DOCUMENTS_SEQ.NEXTVAL INTO :NEW.DOCUMENT_ID FROM SYS.DUAL;
      END IF;
    END COLUMN_SEQUENCES;
  END;
/
ALTER TRIGGER "DOCUMENTS_TRG" ENABLE;


------------------------------------
-- METADATA
-- requires sequence, table, trigger
------------------------------------
DROP SEQUENCE "METADATA_SEQ";

CREATE SEQUENCE "METADATA_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "METADATA" (
  "ID" NUMBER NOT NULL ENABLE, 
  "DOCUMENT_ID" NUMBER NOT NULL ENABLE, 
  "GROUP_ID" NUMBER NOT NULL ENABLE, 
  "SYSTEM_ID" VARCHAR2(50 BYTE) NOT NULL ENABLE, 
  "VERSION" VARCHAR2(50 BYTE),
  "KEYVALUES" CLOB, 
  "RESPONSE_STATUS" NUMBER(*,0),
  "RESPONSE_STATUS_UPDATED" DATE,
  "RESPONSE_STATUS_UPDATED_BY" NUMBER,
  CONSTRAINT "METADATA_PK" PRIMARY KEY ("ID") USING INDEX ENABLE, 
  CONSTRAINT "METADATA_FK_GROUPS" FOREIGN KEY ("GROUP_ID") REFERENCES "GROUPS" ("GROUP_ID") ON DELETE CASCADE ENABLE, 
  CONSTRAINT "METADATA_FK_DOCUMENTS" FOREIGN KEY ("DOCUMENT_ID") REFERENCES "DOCUMENTS" ("DOCUMENT_ID") ON DELETE CASCADE ENABLE
)
LOB ("KEYVALUES") STORE AS BASICFILE;

COMMENT ON COLUMN "METADATA"."ID" IS 'internal ID';
COMMENT ON COLUMN "METADATA"."DOCUMENT_ID" IS 'ID of the document to which the metadata belongs to';
COMMENT ON COLUMN "METADATA"."GROUP_ID" IS 'ID of the group to which the metadata belongs to';
COMMENT ON COLUMN "METADATA"."SYSTEM_ID" IS 'ID of the related system/authority';
COMMENT ON COLUMN "METADATA"."VERSION" IS 'Version of the annotated document';
COMMENT ON COLUMN "METADATA"."KEYVALUES" IS 'Key-value pairs of metadata';
COMMENT ON COLUMN "METADATA"."RESPONSE_STATUS" IS 'Enum denoting status of ISC responses';
COMMENT ON COLUMN "METADATA"."RESPONSE_STATUS_UPDATED" IS 'Timestamp of response status change';
COMMENT ON COLUMN "METADATA"."RESPONSE_STATUS_UPDATED_BY" IS 'User id of user that changed response status';

CREATE INDEX "METADATA_IX_RESPONSE_STATUS" ON "METADATA" ("RESPONSE_STATUS");
CREATE INDEX "METADATA_IX_SYSTEM_ID" ON "METADATA" ("SYSTEM_ID");
CREATE INDEX "METADATA_IX_VERSION" ON "METADATA" ("VERSION");

CREATE OR REPLACE TRIGGER "METADATA_TRG" 
BEFORE INSERT ON METADATA 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF INSERTING AND :NEW.ID IS NULL THEN
      SELECT METADATA_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "METADATA_TRG" ENABLE;


------------------------------------
-- ANNOTATIONS
-- requires table, indexes
------------------------------------
CREATE TABLE "ANNOTATIONS" (
  "ANNOTATION_ID" VARCHAR2(22 BYTE) NOT NULL ENABLE, 
  "LINKED_ANNOT_ID" VARCHAR2(22 BYTE),
  "TEXT" CLOB, 
  "CREATED" DATE DEFAULT sysdate NOT NULL ENABLE, 
  "UPDATED" DATE DEFAULT sysdate NOT NULL ENABLE, 
  "USER_ID" NUMBER NOT NULL ENABLE, 
  "SHARED" NUMBER(1,0) DEFAULT 1 NOT NULL ENABLE, 
  "TARGET_SELECTORS" CLOB NOT NULL ENABLE, 
  "REFERENCES" CLOB, 
  "ROOT" VARCHAR2(4000 BYTE) GENERATED ALWAYS AS (SYS_OP_CL2C(CASE  WHEN "REFERENCES" IS NULL THEN NULL ELSE SUBSTR("REFERENCES",1,22) END )) VIRTUAL VISIBLE,
  "METADATA_ID" NUMBER NOT NULL ENABLE,
  "STATUS" SMALLINT DEFAULT 0 NOT NULL ENABLE,
  "STATUS_UPDATED" DATE,
  "STATUS_UPDATED_BY" NUMBER,
  "SENT_DELETED" NUMBER(1,0) DEFAULT 0 NOT NULL ENABLE,
  "RESP_VERSION_SENT_DELETED" NUMBER DEFAULT 0 NOT NULL ENABLE,
  "CONNECTED_ENTITY_ID" NUMBER,
  "PRECEDING_TEXT" VARCHAR2(300 CHAR),
  "SUCCEEDING_TEXT" VARCHAR2(300 CHAR),
  CONSTRAINT "ANNOTATIONS_PK" PRIMARY KEY ("ANNOTATION_ID") USING INDEX ENABLE, 
  CONSTRAINT "ANNOTATIONS_FK_USERS" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("USER_ID") ON DELETE CASCADE ENABLE, 
  CONSTRAINT "ANNOTATIONS_FK_METADATA" FOREIGN KEY ("METADATA_ID") REFERENCES "METADATA" ("ID") ON DELETE CASCADE ENABLE,
  CONSTRAINT "ANNOTATIONS_FK_ROOT" FOREIGN KEY ("ROOT") REFERENCES "ANNOTATIONS" ("ANNOTATION_ID") ON DELETE CASCADE ENABLE,
  CONSTRAINT "ANNOTATIONS_FK_GROUPS" FOREIGN KEY ("CONNECTED_ENTITY_ID") REFERENCES "GROUPS" ("GROUP_ID") ON DELETE CASCADE ENABLE
) 
LOB ("TEXT") STORE AS BASICFILE 
LOB ("TARGET_SELECTORS") STORE AS BASICFILE  
LOB ("REFERENCES") STORE AS BASICFILE;

COMMENT ON COLUMN "ANNOTATIONS"."ANNOTATION_ID" IS 'UUID';
COMMENT ON COLUMN "ANNOTATIONS"."LINKED_ANNOT_ID" IS 'ID of linked annotation';
COMMENT ON COLUMN "ANNOTATIONS"."TEXT" IS 'annotated text';
COMMENT ON COLUMN "ANNOTATIONS"."CREATED" IS 'date of creation of the annotation';
COMMENT ON COLUMN "ANNOTATIONS"."UPDATED" IS 'date of last update of the annotation';
COMMENT ON COLUMN "ANNOTATIONS"."USER_ID" IS 'user''s ID, see USERS table';
COMMENT ON COLUMN "ANNOTATIONS"."SHARED" IS 'flag indicating whether annotation is private or group-public';
COMMENT ON COLUMN "ANNOTATIONS"."TARGET_SELECTORS" IS 'serialized selectors; JSON';
COMMENT ON COLUMN "ANNOTATIONS"."REFERENCES" IS 'List of parent annotations';
COMMENT ON COLUMN "ANNOTATIONS"."ROOT" IS 'ID of thread root (for replies)';
COMMENT ON COLUMN "ANNOTATIONS"."METADATA_ID" IS 'ID of the related metadata set';
COMMENT ON COLUMN "ANNOTATIONS"."STATUS" IS 'Annotation status, e.g. normal/deleted/accepted/rejected';
COMMENT ON COLUMN "ANNOTATIONS"."STATUS_UPDATED" IS 'Timestamp of status change';
COMMENT ON COLUMN "ANNOTATIONS"."STATUS_UPDATED_BY" IS 'User id of user that changed status';
COMMENT ON COLUMN "ANNOTATIONS"."SENT_DELETED" IS 'Flag for pre-deleting annotation';
COMMENT ON COLUMN "ANNOTATIONS"."RESP_VERSION_SENT_DELETED" IS 'The ISC response version during which the annotation was sent-deleted';
COMMENT ON COLUMN "ANNOTATIONS"."CONNECTED_ENTITY_ID" IS 'Group ID of entity used for creating annotation';
COMMENT ON COLUMN "ANNOTATIONS"."PRECEDING_TEXT" IS 'Text before the annotation';
COMMENT ON COLUMN "ANNOTATIONS"."SUCCEEDING_TEXT" IS 'Text after the annotation';

CREATE INDEX "ANNOTATIONS_IX_USERS" ON "ANNOTATIONS" ("USER_ID");
CREATE INDEX "ANNOTATIONS_IX_METADATA" ON "ANNOTATIONS" ("METADATA_ID");
CREATE INDEX "ANNOTATIONS_IX_STATUS_ROOT" ON "ANNOTATIONS" (STATUS ASC, ROOT ASC);


------------------------------------
-- TAGS
-- requires sequence, table, trigger
------------------------------------
DROP SEQUENCE "TAGS_SEQ";

CREATE SEQUENCE "TAGS_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "TAGS" (
  "NAME" VARCHAR2(50 BYTE) NOT NULL ENABLE, 
  "ANNOTATION_ID" VARCHAR2(22 BYTE) NOT NULL ENABLE, 
  "TAG_ID" NUMBER NOT NULL ENABLE, 
  CONSTRAINT "TAGS_PK" PRIMARY KEY ("TAG_ID") USING INDEX ENABLE, 
  CONSTRAINT "TAGS_UK_NAME_ANNOT" UNIQUE ("NAME", "ANNOTATION_ID") USING INDEX ENABLE, 
  CONSTRAINT "TAGS_FK_ANNOTATION" FOREIGN KEY ("ANNOTATION_ID") REFERENCES "ANNOTATIONS" ("ANNOTATION_ID") ON DELETE CASCADE ENABLE
);

COMMENT ON COLUMN "TAGS"."NAME" IS 'Tag';
COMMENT ON COLUMN "TAGS"."ANNOTATION_ID" IS 'Annotation to which the tag belongs to';
COMMENT ON COLUMN "TAGS"."TAG_ID" IS 'ID';

CREATE OR REPLACE TRIGGER "TAGS_TRG" 
  BEFORE INSERT ON TAGS 
  FOR EACH ROW 
  BEGIN
    <<COLUMN_SEQUENCES>>
    BEGIN
      IF INSERTING AND :NEW.TAG_ID IS NULL THEN
        SELECT TAGS_SEQ.NEXTVAL INTO :NEW.TAG_ID FROM SYS.DUAL;
      END IF;
    END COLUMN_SEQUENCES;
  END;
/
ALTER TRIGGER "TAGS_TRG" ENABLE;


------------------------------------
-- AUTHCLIENTS
-- requires sequence, table, trigger
------------------------------------
DROP SEQUENCE "AUTHCLIENTS_SEQ";

CREATE SEQUENCE "AUTHCLIENTS_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "AUTHCLIENTS" (
  "DESCRIPTION" VARCHAR2(50 BYTE) NOT NULL ENABLE, 
  "ID" NUMBER NOT NULL ENABLE, 
  "SECRET" VARCHAR2(80 BYTE) NOT NULL ENABLE, 
  "CLIENT_ID" VARCHAR2(80 BYTE) NOT NULL ENABLE, 
  "AUTHORITIES" VARCHAR2(80 BYTE), 
  CONSTRAINT "AUTHCLIENTS_PK" PRIMARY KEY ("ID") USING INDEX ENABLE, 
  CONSTRAINT "AUTHCLIENTS_UK_SECRET" UNIQUE ("SECRET") USING INDEX ENABLE, 
  CONSTRAINT "AUTHCLIENTS_UK_CLIENT_ID" UNIQUE ("CLIENT_ID") USING INDEX ENABLE
);

COMMENT ON COLUMN "AUTHCLIENTS"."DESCRIPTION" IS 'Description for identitying the client';
COMMENT ON COLUMN "AUTHCLIENTS"."ID" IS 'internal ID';
COMMENT ON COLUMN "AUTHCLIENTS"."SECRET" IS 'Client''s secret key, used for decrypting tokens';
COMMENT ON COLUMN "AUTHCLIENTS"."CLIENT_ID" IS 'Client''s issuer ID, used to identify its tokens';
COMMENT ON COLUMN "AUTHCLIENTS"."AUTHORITIES" IS 'Authorities for which this client is allowed to authorize users; separated by semi-colons';

CREATE OR REPLACE TRIGGER "AUTHCLIENTS_TRG" 
  BEFORE INSERT ON AUTHCLIENTS 
  FOR EACH ROW 
  BEGIN
    <<COLUMN_SEQUENCES>>
    BEGIN
      IF INSERTING AND :NEW.ID IS NULL THEN
        SELECT AUTHCLIENTS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
      END IF;
    END COLUMN_SEQUENCES;
  END;
/
ALTER TRIGGER "AUTHCLIENTS_TRG" ENABLE;


------------------------------------
-- TOKENS
-- requires sequence, table, trigger
------------------------------------
DROP SEQUENCE "TOKENS_SEQ";

CREATE SEQUENCE "TOKENS_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE;

CREATE TABLE "TOKENS" (
  "ID" NUMBER NOT NULL ENABLE, 
  "USER_ID" NUMBER NOT NULL ENABLE, 
  "AUTHORITY" VARCHAR2(50 BYTE) NOT NULL ENABLE,
  "ACCESS_TOKEN" VARCHAR2(50 BYTE) NOT NULL ENABLE, 
  "ACCESS_TOKEN_EXPIRES" DATE NOT NULL ENABLE, 
  "REFRESH_TOKEN" VARCHAR2(50 BYTE) NOT NULL ENABLE, 
  "REFRESH_TOKEN_EXPIRES" DATE NOT NULL ENABLE, 
  CONSTRAINT "TOKENS_PK" PRIMARY KEY ("ID") USING INDEX ENABLE, 
  CONSTRAINT "TOKENS_UK_REFRESH_TOKEN" UNIQUE ("REFRESH_TOKEN") USING INDEX ENABLE, 
  CONSTRAINT "TOKENS_UK_ACCESS_TOKEN" UNIQUE ("ACCESS_TOKEN") USING INDEX ENABLE, 
  CONSTRAINT "TOKENS_FK_USERS" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("USER_ID") ON DELETE CASCADE ENABLE
);

COMMENT ON COLUMN "TOKENS"."ID" IS 'Internal ID';
COMMENT ON COLUMN "TOKENS"."USER_ID" IS 'ID of the user owning the tokens';
COMMENT ON COLUMN "TOKENS"."AUTHORITY" IS 'Authority for which the token is issued';
COMMENT ON COLUMN "TOKENS"."ACCESS_TOKEN" IS 'Access token granted to the user';
COMMENT ON COLUMN "TOKENS"."ACCESS_TOKEN_EXPIRES" IS 'Expiration timestamp of access token';
COMMENT ON COLUMN "TOKENS"."REFRESH_TOKEN" IS 'Refresh token granted to the user';
COMMENT ON COLUMN "TOKENS"."REFRESH_TOKEN_EXPIRES" IS 'Expiration timestamp of the refresh token';

CREATE OR REPLACE TRIGGER "TOKENS_TRG" 
  BEFORE INSERT ON TOKENS 
  FOR EACH ROW 
  BEGIN
    <<COLUMN_SEQUENCES>>
    BEGIN
      IF INSERTING AND :NEW.ID IS NULL THEN
        SELECT TOKENS_SEQ.NEXTVAL INTO :NEW.ID FROM SYS.DUAL;
      END IF;
    END COLUMN_SEQUENCES;
  END;
/
ALTER TRIGGER "TOKENS_TRG" ENABLE;