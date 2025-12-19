import * as React from "react";
import Button from "./Button";
import { View, Text, ScrollView } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import { HistoryContext } from "../context/HistoryContext";

export default function MyKeyboard() {
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState("");
    const { addToHistory } = React.useContext(HistoryContext);

    // Character maps for display vs evaluation
    const displayMap: { [key: string]: string } = {
        "*": "×",
        "/": "÷",
        "sqrt": "√",
        "pi": "π",
    };

    const handlePress = (val: string) => {
        // Prevent multiple operators in a row if needed, or rely on eval throwing error (caught below)
        setInput((prev) => prev + val);
    };

    const handleScientific = (op: string) => {
        switch (op) {
            case "sin": setInput((prev) => prev + "sin("); break;
            case "cos": setInput((prev) => prev + "cos("); break;
            case "tan": setInput((prev) => prev + "tan("); break;
            case "log": setInput((prev) => prev + "log10("); break; // Base 10
            case "ln": setInput((prev) => prev + "log("); break; // Base e
            case "pi": setInput((prev) => prev + "pi"); break;
            case "e": setInput((prev) => prev + "e"); break;
            case "sqrt": setInput((prev) => prev + "sqrt("); break;
            case "^": setInput((prev) => prev + "^"); break;
            case "%": setInput((prev) => prev + "%"); break;
            default: break;
        }
    };

    const clear = () => {
        setInput("");
        setResult("");
    };

    const backspace = () => {
        setInput((prev) => prev.slice(0, -1));
        setResult(""); // Clear result preview on edit? Or keep it? keeping it empty for now
    };

    // Safe Eval function
    const evaluate = (expression: string): number => {
        // Replace display symbols with JS math
        let expr = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/pi/g, "Math.PI")
            .replace(/e/g, "Math.E")
            .replace(/sin\(/g, "Math.sin(degKy*") // We need to handle degrees vs radians. JS is radians.
            .replace(/cos\(/g, "Math.cos(degKy*")
            .replace(/tan\(/g, "Math.tan(degKy*")
            .replace(/log10\(/g, "Math.log10(")
            .replace(/log\(/g, "Math.log(")
            .replace(/sqrt\(/g, "Math.sqrt(")
            .replace(/\^/g, "**")
            // Handle degrees conversion: sin(30) -> Math.sin(30 * Math.PI / 180)
            // A simple hack for 'sin(' replacing with 'Math.sin((Math.PI/180)*' only works if closing param is clean.
            // Better approach: Pre-process 'sin(x)' matches.
            // For now, let's assume standard radians for simplicity OR implement a basic degree converter if user insists.
            // User requested "Scientific mode", usually implies degrees for sin/cos in calc apps.
            // Let's inject a constant multiplier for the arguments.
            // Actually, simplest 'eval' approach for degrees:
            .replace(/sin\(/g, "Math.sin((Math.PI/180)*")
            .replace(/cos\(/g, "Math.cos((Math.PI/180)*")
            .replace(/tan\(/g, "Math.tan((Math.PI/180)*");

        // Handle %: N% -> N/100.  Complex logic needed for "N + M%", usually simple replacement /100 works for single nums.
        expr = expr.replace(/%/g, "/100");

        try {
            // eslint-disable-next-line no-new-func
            return new Function('return ' + expr)();
        } catch (e) {
            return NaN;
        }
    };

    const getResult = () => {
        const val = evaluate(input);
        if (isNaN(val)) {
            setResult("Error");
        } else {
            // Fix precision
            let finalVal = parseFloat(val.toPrecision(12));
            setResult(finalVal.toString());
            addToHistory(input, finalVal.toString());

            // "Google Style": Result becomes the new input if user continues?
            // User said: "Calculations start from right to left... infinite calculations"
            // Usually after '=', the input becomes the result.
            setInput(finalVal.toString());
            // We clear result preview as it is now the main input
            setResult("");
        }
    };

    // Live Result Preview (Optional, but nice)
    // Effect to calculate result as they type? 
    // Google calc shows gray preview.
    React.useEffect(() => {
        if (!input) { setResult(""); return; }
        // Don't eval incomplete expr like "1+"
        if (/[+\-*/^]$/.test(input)) return;

        const val = evaluate(input);
        if (!isNaN(val) && isFinite(val)) {
            // Only show if different from input
            if (val.toString() !== input) {
                setResult(parseFloat(val.toPrecision(12)).toString());
            }
        }
    }, [input]);


    return (
        <View style={Styles.viewBottom}>
            {/* Display Section */}
            <View
                style={{
                    height: 120,
                    width: "90%",
                    justifyContent: "flex-end",
                    alignSelf: "center",
                    paddingBottom: 10,
                }}
            >
                {/* Main Input (Expression) */}
                <Text
                    style={[Styles.screenFirstNumber, { fontSize: input.length > 10 ? 50 : 80 }]}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {input || "0"}
                </Text>

                {/* Result Preview (Small Gray) */}
                {result !== "" && (
                    <Text style={[Styles.screenSecondNumber, { fontSize: 30, color: "gray" }]}>
                        {result}
                    </Text>
                )}
            </View>

            <View style={Styles.row}>
                <Button title="sin" isGray onPress={() => handleScientific("sin")} />
                <Button title="cos" isGray onPress={() => handleScientific("cos")} />
                <Button title="tan" isGray onPress={() => handleScientific("tan")} />
                <Button title="log" isGray onPress={() => handleScientific("log")} />
            </View>
            <View style={Styles.row}>
                <Button title="ln" isGray onPress={() => handleScientific("ln")} />
                <Button title="π" isGray onPress={() => handleScientific("pi")} />
                <Button title="e" isGray onPress={() => handleScientific("e")} />
                <Button title="^" isBlue onPress={() => handlePress("^")} />
            </View>
            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="√" isGray onPress={() => handleScientific("sqrt")} />
                <Button title="%" isGray onPress={() => handlePress("%")} />
                <Button title="÷" isBlue onPress={() => handlePress("/")} />
            </View>

            <View style={Styles.row}>
                <Button title="7" onPress={() => handlePress("7")} />
                <Button title="8" onPress={() => handlePress("8")} />
                <Button title="9" onPress={() => handlePress("9")} />
                <Button title="x" isBlue onPress={() => handlePress("*")} />
            </View>

            <View style={Styles.row}>
                <Button title="4" onPress={() => handlePress("4")} />
                <Button title="5" onPress={() => handlePress("5")} />
                <Button title="6" onPress={() => handlePress("6")} />
                <Button title="-" isBlue onPress={() => handlePress("-")} />
            </View>

            <View style={Styles.row}>
                <Button title="1" onPress={() => handlePress("1")} />
                <Button title="2" onPress={() => handlePress("2")} />
                <Button title="3" onPress={() => handlePress("3")} />
                <Button title="+" isBlue onPress={() => handlePress("+")} />
            </View>

            <View style={Styles.row}>
                <Button title="." onPress={() => handlePress(".")} />
                <Button title="0" onPress={() => handlePress("0")} />
                <Button title="⌫" onPress={backspace} />
                <Button title="=" isBlue onPress={getResult} />
            </View>
        </View>
    );
}
