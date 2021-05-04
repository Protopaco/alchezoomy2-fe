import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../styles/colors";

export const useStyles = makeStyles({
    root: {
        height: "300px",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        border: "1px solid red"
    },
    title: {
        backgroundColor: primaryMain,
        color: "white"
    },
    colorFrame: {
        display: "flex",
        flexDirection: "column",
        justifyItems: "space-around",
        alignContent: "center",
        border: "1px solid purple",
        width: "90%",
        height: "100%",
    },
    list: {
        listStyleType: "none",
        display: "flex",
        // width: "100%",
        justifyContent: "space-around",
        // margin: "5px",
        border: "1px solid green",
        padding: 0
    },

});

export default useStyles;
