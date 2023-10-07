import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import classes from "./CustomStyle.module.css";

const useStyles = makeStyles((theme) => ({
  itemperpage: {
    marginTop: "3px",
  },
  background: {
    backgroundColor: "transparent",
  },
  showingtext: {
    marginTop: "25px",
    marginLeft: "30px",
  },
  pageSelect: {
    height: "38px !important",
    borderRadius: "4px",
    "&:hover": {
      height: "38px !important",
      borderRadius: "4px",
    },
    "&>div": {
      background: "none !important",
    },
  },
}));
export default function CustomPaginationDropdown({
  itemperpage,
  totalData,
  title,
  value = 10,
  dashboard = false,
}) {
  const styles = useStyles();
  return (
    <div className={classes.paginationsizedropdown}>
      {totalData?.items?.length > 0 || totalData?.machines?.length > 0 ? (
        <div className={classes.paginationtxt}>
          <div className={classes.typography}>
            <Typography>
              Showing:
              <strong>
                {" "}
                {!totalData?.total_count
                  ? 0
                  : totalData?.size &&
                    totalData?.page &&
                    totalData?.size * (totalData?.page - 1) + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {totalData?.size &&
                totalData?.page &&
                totalData?.total_count &&
                totalData?.size * totalData?.page <= totalData?.total_count
                  ? totalData?.size * totalData?.page
                  : totalData?.total_count ?? 0}
              </strong>
              &nbsp;of{" "}
              <strong>
                {totalData?.total_count ? totalData?.total_count : 0}
              </strong>{" "}
              {title}
            </Typography>
          </div>
          <div className={classes.dropdowndisplay}>
            <p>{title} Per Page : </p>
            {dashboard ? (
              <FormControl>
                <Select
                  value={value}
                  className={styles?.pageSelect}
                  onChange={itemperpage}
                >
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl>
                <Select
                  value={value}
                  className={styles?.pageSelect}
                  defaultValue={10}
                  id="demo-simple-select"
                  onChange={(e) => itemperpage(e)}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
