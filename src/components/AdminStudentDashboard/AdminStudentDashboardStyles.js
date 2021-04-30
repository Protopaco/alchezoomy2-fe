import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

const useStyles = makeStyles(() => ({
    root, frame,
    textField: {
        marginLeft: "5px",
        width: "90%"
    },
    input: {
        color: "white",
        borderColor: "white"
    },
    teacherName: {
        marginLeft: "5px"
    },
    searchBar: {
        flexGrow: 1,
        border: "1px solid #4054b4",
        borderRadius: "5px"
    },
}));

export default useStyles;
