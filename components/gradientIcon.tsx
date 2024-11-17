import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const GradientIcon = ({ lib, name, size, colors }) => {
	return (
		<View style={{ width: size, height: size }}>
			<LinearGradient colors={colors} style={StyleSheet.absoluteFill} start={[0, 0]} end={[1, 1]} />
			{lib === "MaterialIcons" && <MaterialIcons name={name} size={size} style={styles.icon} />}
			{lib === "Ionicons" && <Ionicons name={name} size={size} style={styles.icon} />}
			{lib === "FontAwesome5" && <FontAwesome5 name={name} size={size} style={styles.icon} />}
		</View>
	);
};

const styles = StyleSheet.create({
	icon: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		textAlign: "center",
		textAlignVertical: "center",
		color: "transparent",
		backgroundClip: "text",
		WebkitBackgroundClip: "text",
	},
});

export default GradientIcon;
