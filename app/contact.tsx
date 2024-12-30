import React, { useState } from "react";
import Background from "../components/background";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Linking, KeyboardAvoidingView, Platform } from "react-native";

export default function ContactScreen() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async () => {
		const mailtoUrl = `mailto:fcs@unsa.org?subject=Contact&body=Nom : ${name}%0D%0AMessage : ${message}`;

		try {
			await Linking.openURL(mailtoUrl);
		} catch (error) {
			Alert.alert("Error", "Could not open mail app");
		}
	};

	return (
		<Background>
			<SafeAreaView style={styles.wrapper}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
					<View style={styles.container}>
						<View style={styles.form}>
							<Image source={require("../assets/images/unsa-logo.png")} style={styles.logo} />
							<Text style={styles.title}>Contactez-nous</Text>

							<TextInput style={styles.input} placeholder="Votre nom" value={name} onChangeText={setName} />

							<TextInput style={[styles.input, styles.textArea]} placeholder="Votre message" value={message} onChangeText={setMessage} multiline numberOfLines={4} />

							<TouchableOpacity style={styles.button} onPress={handleSubmit}>
								<Text style={styles.buttonText}>Envoyer</Text>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</Background>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	form: {
		width: "100%",
		maxWidth: 500,
		paddingHorizontal: 40,
		alignContent: "center",
		justifyContent: "center",
		marginBottom: 40,
	},
	logo: {
		width: 180,
		height: 180,
		alignSelf: "center",
		marginBottom: 20,
	},
	title: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		backgroundColor: "white",
		borderColor: "#ddd",
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginBottom: 15,
	},
	textArea: {
		height: 120,
		textAlignVertical: "top",
	},
	button: {
		backgroundColor: "#0099FF",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});
