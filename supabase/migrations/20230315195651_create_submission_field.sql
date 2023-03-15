--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: submission_field; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.submission_field (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    fields_id uuid,
    field_body text,
    submission_id uuid
);


ALTER TABLE public.submission_field OWNER TO supabase_admin;

--
-- Name: submission_field submission_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.submission_field
    ADD CONSTRAINT submission_fields_pkey PRIMARY KEY (id);


--
-- Name: submission_field submission_field_fields_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.submission_field
    ADD CONSTRAINT submission_field_fields_id_fkey FOREIGN KEY (fields_id) REFERENCES public.evaluation_field(id);


--
-- Name: submission_field submission_field_submission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.submission_field
    ADD CONSTRAINT submission_field_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.submission(id);


--
-- Name: TABLE submission_field; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.submission_field TO anon;
GRANT ALL ON TABLE public.submission_field TO authenticated;
GRANT ALL ON TABLE public.submission_field TO postgres;
GRANT ALL ON TABLE public.submission_field TO service_role;


--
-- PostgreSQL database dump complete
--

