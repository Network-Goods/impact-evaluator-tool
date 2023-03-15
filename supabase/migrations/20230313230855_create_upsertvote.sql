set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.upsertvote(in_evaluator_id uuid, in_submission_id uuid, vote_count integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
  INSERT INTO votes (votes, evaluator_id, submission_id)   
  VALUES(vote_count, in_evaluator_id, in_submission_id)  
  ON CONFLICT (evaluator_id, submission_id)  
  DO UPDATE SET votes = vote_count; 
end;$function$
;