import { makeStyles } from "@material-ui/core/styles";
import { root, frame, component } from "../../styles/frames";
const useStyles = makeStyles(() => ({
    root, frame, component,
    boxDiv: {
        marginTop: "20px"
    },
    playerWrapper: {
        width: "80%",
        maxWidth: "800px",
        height: "auto", // Reset height
        display: "flex",
        alignContent: "center",
        justifyItems: "center",
    },
    bigContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid blue",

    },
    boxContainer: {
        display: "flex",
        justifyItems: "center",
        alignContent: "space-between",
        border: "1px solid orange"
    }
}));

export default useStyles;