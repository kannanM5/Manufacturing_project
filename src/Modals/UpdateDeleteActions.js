import { CustomButton } from "../Components";

function UpdateDeleteActions({
  onUpdatePress,
  onCancelPress,
  deleteSchedule = false,
}) {
  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-4 col-6 mb-3">
          <CustomButton title="Update" onButtonPress={onUpdatePress} />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-4  col-6 mb-3">
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
