import { useEffect } from "react";
import Add from "public/images/svg/Add";
import Delete from "public/images/svg/Delete";
import Edit from "public/images/svg/Edit";
import { Submission as SubmissionType, SubmissionFormInputs } from "src/lib";
import { SubmissionFormLinkInputs } from "src/lib";

type SubmissionProps = {
  store: any;
  githubHandleFromProfile?: string;
  formInputs: SubmissionFormInputs;
  setFormInputs: any;
  isGithubHandleChecked?: boolean;
  setIsGithubHandleChecked?: any;
  submission?: SubmissionType;
};

export default function Submission({
  store,
  githubHandleFromProfile,
  formInputs,
  setFormInputs,
  isGithubHandleChecked,
  setIsGithubHandleChecked,
  submission,
}: SubmissionProps) {
  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof SubmissionFormInputs,
  ) => {
    const value = event.target.value;
    setFormInputs((values: SubmissionFormInputs) => ({ ...values, [fieldName]: value }));
  };

  const handleLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: keyof SubmissionFormLinkInputs,
  ) => {
    const value = event.target.value;
    setFormInputs((values: any) => {
      const links = values.links;
      links[index][fieldName] = value;
      return { ...values, links: links };
    });
  };
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    const value = event.target.value;
    setFormInputs((values: any) => {
      const evaluation_field = values.evaluation_field;
      const field = evaluation_field.find((field: any) => field.field_name === fieldName);
      field.submission_field[0].field_body = value;
      return { ...values, evaluation_field: evaluation_field };
    });
  };

  const handleChecked = () => {
    const githubHandle = !isGithubHandleChecked ? githubHandleFromProfile : "";
    setIsGithubHandleChecked((prev: boolean) => !prev);
    setFormInputs((values: SubmissionFormInputs) => ({ ...values, githubHandle: githubHandle }));
    store.setGithubHandle(githubHandle);
  };

  console.log("store", store);
  console.log("formInputs", formInputs);
  return (
    <>
      <div className="mb-9">
        <p className="text-xl font-bold pb-3">Project or Team Title</p>
        <input
          type="text"
          name="name"
          maxLength={100}
          className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
          placeholder="Example Title"
          value={formInputs.name || ""}
          onChange={(e) => handleFormChange(e, "name")}
          onBlur={
            !submission
              ? (e) => store.setSubmissionTitle(e.target.value)
              : (e) => store.setSubmissionTitle(e.target.value, submission?.id)
          }
        />
      </div>
      {formInputs.evaluation_field.map((field: any) => {
        return (
          <div key={field.id} className="mb-9">
            <p className="text-xl font-bold pb-3">{field.field_name}</p>
            <textarea
              className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="My project is..."
              maxLength={280}
              value={field.submission_field[0]?.field_body || ""}
              onChange={(e) => handleFieldChange(e, field.field_name)}
              onBlur={
                !submission
                  ? (e) => store.setSubmissionDescription(e.target.value, "description")
                  : (e) => store.setSubmissionDescription(e.target.value, "description", submission?.id)
              }
            />
          </div>
        );
      })}
      <div className="mb-9">
        <p className="text-xl font-bold">Project Description</p>
        <div className="text-[17px] text-[#898888] py-1">
          Using <b>280 characters</b> or less, describe your project.
        </div>
        <textarea
          className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
          placeholder="My project is..."
          name="description"
          maxLength={280}
          value={formInputs.description || ""}
          onChange={(e) => handleFormChange(e, "description")}
          onBlur={
            !submission
              ? (e) => store.setSubmissionDescription(e.target.value, "description")
              : (e) => store.setSubmissionDescription(e.target.value, "description", submission?.id)
          }
        />
      </div>
      <div className="mb-9">
        <p className="text-xl font-bold">Progress Summary</p>
        <div className="text-[17px] text-[#898888] py-1">
          Using <b>280 characters</b> or less, describe what your project has accomplished{" "}
          <span className="font-bold italic">in the past 1 month</span>.
        </div>

        <textarea
          className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
          placeholder="In the past 1 month, my project has..."
          name="summary"
          maxLength={280}
          value={formInputs.summary || ""}
          onChange={(e) => handleFormChange(e, "summary")}
          onBlur={
            !submission
              ? (e) => store.setSubmissionDescription(e.target.value, "summary")
              : (e) => store.setSubmissionDescription(e.target.value, "summary", submission?.id)
          }
        />
      </div>
      <div className="mb-9">
        <p className="text-xl font-bold">FVM Tech Specs</p>
        <div className="text-[17px] text-[#898888] py-1">
          Using <b>360 characters</b> or less, describe your F(E)VM smart contract designs as well as the unique value
          your contracts bring to Filecoin.
        </div>
        <textarea
          className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
          placeholder="My project is using FVM's functionality to..."
          name="specs"
          maxLength={360}
          value={formInputs.specs || ""}
          onChange={(e) => handleFormChange(e, "specs")}
          onBlur={
            !submission
              ? (e) => store.setSubmissionDescription(e.target.value, "specs")
              : (e) => store.setSubmissionDescription(e.target.value, "specs", submission?.id)
          }
        />
      </div>
      <p className="text-xl font-bold pb-3">Links</p>
      <div className="pb-3">
        <p className="text-[17px] text-blue-alt font-bold pb-1">Github Repo</p>
        <input
          type="text"
          name="github_link"
          className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
          placeholder="https://github.com/protocol/research"
          value={formInputs.github_link || ""}
          onChange={(e) => handleFormChange(e, "github_link")}
          onBlur={
            !submission
              ? (e) => store.setGithubLink(e.target.value)
              : (e) => store.setGithubLink(e.target.value, submission?.id)
          }
        />
      </div>
      {formInputs.links &&
        formInputs.links.map((link: any, index: number) => {
          return (
            <div key={index} className="pb-3">
              <div className="flex items-center pb-1">
                <div className="flex justify-center items-center w-5 h-5 -ml-5 ">
                  <Edit className="h-4 w-4 fill-gray mr-1" />
                </div>
                <input
                  autoFocus={!submission}
                  type="text"
                  name="website_title"
                  className="appearance-none text-[17px] text-blue-alt font-bold focus:outline-none"
                  placeholder="Add Link Title"
                  value={link.name || ""}
                  onChange={(e) => handleLinkChange(e, index, "name")}
                  onBlur={
                    !submission
                      ? (e) => store.setSubmissionLinkTitle(e.target.value, index)
                      : (e) => store.setSubmissionLinkTitle(e.target.value, index, submission?.id)
                  }
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="website_link"
                  className="appearance-none w-full px-4 py-2 border border-gray rounded-l-lg focus:outline-none"
                  placeholder="https://protocol.ai/"
                  value={link.value || ""}
                  onChange={(e) => handleLinkChange(e, index, "value")}
                  onBlur={
                    !submission
                      ? (e) => store.setSubmissionLink(e.target.value, index)
                      : (e) => store.setSubmissionLink(e.target.value, index, submission?.id)
                  }
                />
                <button
                  className="font-bold py-[10px] px-4 border border-gray border-l-0 rounded-r-lg bg-blue bg-opacity-5"
                  onClick={
                    !submission
                      ? () => store.deleteSubmissionLink(index)
                      : () => store.deleteSubmissionLink(index, submission?.id)
                  }
                >
                  <Delete className="w-3 h-5 fill-offblack" />
                </button>
              </div>
            </div>
          );
        })}
      <div className="pt-4 pb-9">
        <button
          className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-1"
          onClick={!submission ? () => store.createSubmissionLink() : () => store.createSubmissionLink(submission?.id)}
        >
          <span className="mr-3">
            <Add className="fill-current" />
          </span>

          <span>Add Link</span>
        </button>
      </div>
      {!submission ? (
        <>
          <p className="text-xl font-bold pb-3">Evaluator Representation</p>

          <div className="flex mt-2 mb-7">
            <input
              className=" text-[#E5E7EB] border-[#E5E7EB] rounded-lg"
              type="checkbox"
              name="emailCheck"
              checked={isGithubHandleChecked}
              onChange={() => handleChecked()}
            />{" "}
            <span className="ml-2">I will be evaluating on behalf of this project for the Impact Evaluator round.</span>
          </div>
        </>
      ) : (
        <div className="mb-9">
          <p className="text-[17px] font-bold">User ID</p>

          <input
            className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium  focus:outline-none"
            type="text"
            name="githubHandle"
            value={formInputs.user_id || ""}
            onChange={(e) => handleFormChange(e, "user_id")}
            onBlur={(e) => store.setUserID(e.target.value, submission?.id)}
          />
        </div>
      )}
      <p className="text-[17px] font-bold">GitHub handle for representative:</p>

      <input
        className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium disabled:text-gray focus:outline-none"
        type="text"
        name="githubHandle"
        value={formInputs.githubHandle || ""}
        onChange={(e) => handleFormChange(e, "githubHandle")}
        onBlur={
          !submission
            ? (e) => store.setGithubHandle(e.target.value)
            : (e) => store.setGithubHandle(e.target.value, submission?.id)
        }
        disabled={isGithubHandleChecked}
      />
    </>
  );
}
