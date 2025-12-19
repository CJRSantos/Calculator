import { StyleSheet } from "react-native";
import { myColors } from "./Colors";

export const Styles = StyleSheet.create({
    // Button
    btnBlue: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.blue,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnDark: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnDark,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnLight: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.white,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnGray: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: myColors.btnGray,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    smallTextLight: {
        fontSize: 32,
        color: myColors.white,
    },
    smallTextDark: {
        fontSize: 32,
        color: myColors.black,
    },
    // Keyboard
    row: {
        maxWidth: "100%",
        flexDirection: "row",
    },
    viewBottom: {   // ✅ corregido
        position: "absolute",
        bottom: 50,
    },
    screenFirstNumber: {
        fontSize: 50,
        color: myColors.gray,
        fontWeight: "200",
        alignSelf: "flex-end",
    },
    screenSecondNumber: {
        fontSize: 40,
        color: myColors.gray,
        fontWeight: "200",
        alignSelf: "flex-end",
    },
    // Menu
    menuContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: myColors.btnDark,
        borderRadius: 10,
        padding: 10,
        zIndex: 200,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuItem: {
        padding: 10,
    },
    menuText: {
        color: myColors.white,
        fontSize: 18,
    },
    // History
    historyContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 100,
        padding: 20,
        paddingTop: 60,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: myColors.btnGray,
    },
    historyText: {
        color: myColors.white,
        fontSize: 18,
    },
    historyResult: {
        color: myColors.result,
        fontSize: 24,
        fontWeight: 'bold',
    },
});
