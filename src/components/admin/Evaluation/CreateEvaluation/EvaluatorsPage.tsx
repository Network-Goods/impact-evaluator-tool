import SmallTitle from "src/components/shared/SmallTitle";
import { EvaluationDetailsType } from ".";
import Delete from "public/images/svg/Delete";

type EvaluatorsPageProps = {
  store: any;
  formInputs: EvaluationDetailsType;
  setFormInputs: (formInputs: EvaluationDetailsType) => void;
};

type InvitationInputs = {
  code: string;
  voice_credits: string;
  remaining_uses: string;
};
export default function EvaluatorsPage({ store, formInputs, setFormInputs }: EvaluatorsPageProps) {
  const handleInvitationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    fieldName: keyof InvitationInputs,
  ) => {
    const newFormInputs = formInputs.invitation.map((invitation: any) => {
      if (invitation.id === id) {
        invitation[fieldName] = e.target.value;
      }
      return invitation;
    });
    setFormInputs({ ...formInputs, invitation: newFormInputs });
  };

  const handleChecked = (id: number, is_sme: boolean) => {
    const newFormInputs = formInputs.invitation.map((invitation: any) => {
      if (invitation.id === id) {
        invitation.is_sme = !invitation.is_sme;
      }
      return invitation;
    });
    setFormInputs({ ...formInputs, invitation: newFormInputs });
    store.setInvitationSubmissionRequired(id, is_sme);
  };

  console.log("store", store.evaluation.invitation);
  console.log("inputs", formInputs.invitation);
  return (
    <div className="mb-6">
      <h3 className="text-lg text-offblack font-bold mb-2">Create unique code for Impact Evaluator round.</h3>
      {store.evaluation?.invitation.length !== 0 ? (
        <div className="hidden md:flex justify-between items-center py-2 px-9 bg-[#f0f0f0] border border-gray rounded-t-lg">
          <div className="py-2">
            <SmallTitle text="ROUND CODE" />
          </div>
          <div className="flex">
            <div className="px-5 py-2 text-center w-[121px]">
              <SmallTitle text="VOICE CREDITS" />
            </div>

            <div className="text-center px-7 py-2 border-l border-gray  w-[121px]">
              <SmallTitle text="CODE LIMIT" />
            </div>
            <div className="text-center px-7 py-2 border-l border-gray  w-[140px]">
              <SmallTitle text="FORM SUBMISSION" />
            </div>
            <div className="text-center py-2 border-l border-gray pl-5 w-[74px]"></div>
          </div>
        </div>
      ) : null}
      {store.evaluation?.invitation.map((invitation: any, index: number) => (
        <div
          className="flex flex-col md:flex-row justify-between items-center px-9 bg-white border border-gray py-4 md:py-0 ${
             rounded-b-lg border-t-0"
          key={invitation.id}
        >
          <div className="py-2">
            <input
              type="text"
              name="code"
              className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="ExampleCode123"
              value={invitation.code || ""}
              onChange={(e) => handleInvitationChange(e, invitation.id, "code")}
              onBlur={(e) => store.setInvitationCode(e.target.value, invitation.id)}
            />
          </div>
          <div className="flex">
            <div className="px-5 py-2 text-center w-[121px]">
              <input
                type="number"
                name="voice_credits"
                className="appearance-none w-full pl-4 pr-2 py-2 rounded-lg border border-gray focus:outline-none"
                value={invitation.voice_credits || 0}
                onChange={(e) => handleInvitationChange(e, invitation.id, "voice_credits")}
                onBlur={(e) => store.setInvitationCredits(e.target.value, invitation.id)}
              />
            </div>

            <div className="text-center py-2 px-5 border-l border-gray w-[121px]">
              <input
                type="number"
                name="remaining_uses"
                className="appearance-none w-full pl-4 pr-2 py-2 rounded-lg border border-gray focus:outline-none"
                value={invitation.remaining_uses || 0}
                onChange={(e) => handleInvitationChange(e, invitation.id, "remaining_uses")}
                onBlur={(e) => store.setInvitationRemainingUses(e.target.value, invitation.id)}
              />
            </div>
            <div className="flex items-center justify-evenly text-center py-2 px-5 border-l border-gray w-[140px]">
              <input
                type="checkbox"
                name="form"
                checked={invitation.is_sme || false}
                onChange={() => handleChecked(invitation.id, invitation.is_sme)}
              />{" "}
              <span className="text-sm">Required</span>
            </div>
            <div className="flex items-center justify-end py-2 border-l border-gray w-[74px]">
              <div>
                <button
                  onClick={() => store.deleteInvitation(invitation.id)}
                  className="border border-blue rounded-lg p-2"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-1 mt-2"
        onClick={() => store.createInvitation()}
      >
        <span>Add Code</span>
      </button>
    </div>
  );
}
