import { CustomButton } from "../Components";

function UpdateDeleteActions({
  onUpdatePress,
  onCancelPress,
  deleteSchedule = false,
}) {
  return (
    <>
      <div className="row my-3">
        <div className="col-lg-3 col-12">
          <CustomButton title="Update" onButtonPress={onUpdatePress} />
        </div>
        <div className="col-lg-3 col-12">
          <CustomButton
            title={deleteSchedule ? "Delete" : "Cancel"}
            customButtonStyle={{
              backgroundColor: "var(--tableHeadBg)",
            }}
            onButtonPress={onCancelPress}
          />
        </div>
      </div>
    </>
  );
}

export default UpdateDeleteActions;
