import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const getSubmissions = adminProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { db }, input }) => {
    try {
      const submissionsData = await db.submission.findMany({
        where: { evaluation_id: input.evaluation_id },
        orderBy: { name: "asc" },
        select: {
          name: true,
          github_link: true,
          github_handle: true,
          is_submitted: true,
          links: true,
          description: true,
          user_id: true,
          contract_id: true,
          submission_field: {
            select: {
              id: true,
              field_body: true,
              fields_id: true,
              evaluation_field: {
                select: {
                  heading: true,
                  subheading: true,
                  char_count: true,
                  placeholder: true,
                },
              },
            },
          },
        },
      });

      const submissionsWithUsers = await Promise.all(
        submissionsData.map(async (s) => {
          if (!s.user_id) {
            return { ...s };
          }
          const user = await db.user.findUnique({ where: { id: s.user_id } });
          return {
            ...s,
            user,
          };
        }),
      );

      const formattedSubmissions = submissionsWithUsers.map((s) => {
        const commonProperties = {
          project_name: s.name,
          representative_github: s.github_handle,
          is_submitted: s.is_submitted,
          github_link: s.github_link,
          links: s.links,
          description: s.description,
          fields: s.submission_field.map((sf) => ({
            submission_field_id: sf.id,
            field_body: sf.field_body,
            field_id: sf.fields_id,
            heading: sf.evaluation_field?.heading || "",
            subheading: sf.evaluation_field?.subheading || "",
            char_count: sf.evaluation_field?.char_count || 280,
            placeholder: sf.evaluation_field?.placeholder || "",
          })),
          contract_id: s.contract_id,
        };

        if ("user" in s && s.user) {
          return {
            ...commonProperties,
            submitter_github: s.user.github_handle,
            submitter_email: s.user.preferred_email,
          };
        }

        return {
          ...commonProperties,
          submitter_github: null,
          submitter_email: null,
        };
      });

      return {
        submissions: formattedSubmissions,
      };
    } catch (error) {
      console.error(error);
    }
  });
