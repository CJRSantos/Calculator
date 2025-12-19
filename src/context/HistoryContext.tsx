import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HistoryItem {
    id: string;
    calculation: string;
    result: string;
}

interface HistoryContextType {
    history: HistoryItem[];
    addToHistory: (calculation: string, result: string) => void;
    clearHistory: () => void;
    deleteHistoryItem: (id: string) => void;
}

export const HistoryContext = createContext<HistoryContextType>({
    history: [],
    addToHistory: () => { },
    clearHistory: () => { },
    deleteHistoryItem: () => { },
});

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const storedHistory = await AsyncStorage.getItem('calculator_history');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    };

    const saveHistory = async (newHistory: HistoryItem[]) => {
        try {
            await AsyncStorage.setItem('calculator_history', JSON.stringify(newHistory));
        } catch (e) {
            console.error("Failed to save history", e);
        }
    };

    const addToHistory = (calculation: string, result: string) => {
        const newItem: HistoryItem = {
            id: Date.now().toString(),
            calculation,
            result,
        };
        const updatedHistory = [newItem, ...history];
        setHistory(updatedHistory);
        saveHistory(updatedHistory);
    };

    const clearHistory = () => {
        setHistory([]);
        saveHistory([]);
    };

    const deleteHistoryItem = (id: string) => {
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
        saveHistory(updatedHistory);
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory, deleteHistoryItem }}>
            {children}
        </HistoryContext.Provider>
    );
};
