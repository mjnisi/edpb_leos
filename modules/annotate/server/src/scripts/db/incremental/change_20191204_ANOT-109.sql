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
-- Changes to initial Oracle 
-- database creation scripts
--
-- add a new column on ANNOTATION table: RESP_VERSION_SENT_DELETED
-- 
-- change initiated by ANOT-109
------------------------------------
ALTER TABLE "ANNOTATIONS" ADD "RESP_VERSION_SENT_DELETED" NUMBER DEFAULT 0 NOT NULL ENABLE;
COMMENT ON COLUMN "ANNOTATIONS"."RESP_VERSION_SENT_DELETED" IS 'The ISC response version during which the annotation was sent-deleted';