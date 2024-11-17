import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const Background = ({ children }) => {
	return (
		<ImageBackground
			source={require("../assets/images/back.png")} // Chemin vers votre image de fond
			style={styles.background}
		>
			<View style={styles.overlay}>{children}</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	overlay: {
		flex: 1,
	},
});

export default Background;
