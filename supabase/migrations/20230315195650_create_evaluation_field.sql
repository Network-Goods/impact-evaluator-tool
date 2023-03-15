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
-- Name: evaluation_field; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.evaluation_field (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    evaluation_id uuid,
    heading text,
    subheading text,
    char_count bigint,
    placeholder text
);


ALTER TABLE public.evaluation_field OWNER TO supabase_admin;

--
-- Name: evaluation_field evaluation_field_id_key; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.evaluation_field
    ADD CONSTRAINT evaluation_field_id_key UNIQUE (id);


--
-- Name: evaluation_field evaluation_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.evaluation_field
    ADD CONSTRAINT evaluation_fields_pkey PRIMARY KEY (id);


--
-- Name: evaluation_field evaluation_field_evaluation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.evaluation_field
    ADD CONSTRAINT evaluation_field_evaluation_id_fkey FOREIGN KEY (evaluation_id) REFERENCES public.evaluation(id);


--
-- Name: TABLE evaluation_field; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.evaluation_field TO anon;
GRANT ALL ON TABLE public.evaluation_field TO authenticated;
GRANT ALL ON TABLE public.evaluation_field TO postgres;
GRANT ALL ON TABLE public.evaluation_field TO service_role;


--
-- PostgreSQL database dump complete
--

