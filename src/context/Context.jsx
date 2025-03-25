import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevprompts, setprevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false); // Fix: state name corrected
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        try {
            const response = await run(input);
            console.log(response)
            setResultData(response);
        } catch (error) {
            console.error("API Error:", error);
        }
        setLoading(false);
        setRecentPrompt(input)
        setInput("");
    };

    const contextValue = { 
        prevprompts,
        setprevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult, // Fix: added to context
        setShowResult, // Fix: added to context
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
