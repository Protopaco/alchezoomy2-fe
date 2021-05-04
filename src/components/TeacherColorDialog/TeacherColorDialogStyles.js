import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../styles/colors";

export const useStyles = makeStyles({
    root: {
        height: "300px",
        width: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "space-around",
        border: "1px solid red"
    },
    title: {
        backgroundColor: primaryMain,
        color: "white"
    },
    list: {
        listStyleType: "none",
        display: "flex",
        width: "350px",
        justifyContent: "space-around",
        margin: "5px",
        border: "1px solid green"
    },

});

export default useStyles;
