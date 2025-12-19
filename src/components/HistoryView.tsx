import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { HistoryContext } from '../context/HistoryContext';
import { Styles } from '../styles/GlobalStyles';
import { myColors } from '../styles/Colors';

interface HistoryViewProps {
    visible: boolean;
    onClose: () => void;
}

export default function HistoryView({ visible, onClose }: HistoryViewProps) {
    const { history, clearHistory, deleteHistoryItem } = useContext(HistoryContext);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={Styles.historyContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: myColors.blue, fontSize: 18 }}>Close</Text>
                    </TouchableOpacity>
                    <Text style={{ color: myColors.white, fontSize: 20, fontWeight: 'bold' }}>History</Text>
                    <TouchableOpacity onPress={clearHistory}>
                        <Text style={{ color: myColors.accent, fontSize: 18 }}>Clear All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {history.map((item) => (
                        <View key={item.id} style={Styles.historyItem}>
                            <View>
                                <Text style={Styles.historyText}>{item.calculation}</Text>
                                <Text style={Styles.historyResult}>= {item.result}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteHistoryItem(item.id)}>
                                <Text style={{ color: 'red', fontSize: 24 }}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    {history.length === 0 && (
                        <Text style={{ color: myColors.gray, textAlign: 'center', marginTop: 50 }}>
                            No history yet
                        </Text>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
}
