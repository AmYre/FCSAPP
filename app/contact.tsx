import React, { useState } from "react";
import emailjs from "@emailjs/react-native";
import Background from "../components/background";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";

export default function ContactScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	emailjs.init({
		publicKey: "eI0mBgu9PEbxfu1sP",
	});

	const handleSubmit = async () => {
		if (!name || !email || !message) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}

		try {
			await emailjs.send("service_vxyopll", "template_4yu311i", {
				name: name,
				email: email,
				message: message,
			});
			Alert.alert("Success", "Email sent successfully");
		} catch (error) {
			Alert.alert("Error", "Failed to send email");
		}

		// Reset form
		setName("");
		setEmail("");
		setMessage("");
	};

	return (
		<SafeAreaView style={styles.wrapper}>
			<Background>
				<View style={styles.container}>
					<Image source={require("../assets/images/unsa-logo.png")} style={styles.logo} />
					<Text style={styles.title}>Contactez-nous</Text>

					<TextInput style={styles.input} placeholder="Votre nom" value={name} onChangeText={setName} />

					<TextInput style={styles.input} placeholder="Votre email" value={email} onChangeText={setEmail} keyboardType="email-address" />

					<TextInput style={[styles.input, styles.textArea]} placeholder="Votre message" value={message} onChangeText={setMessage} multiline numberOfLines={4} />

					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Envoyer</Text>
					</TouchableOpacity>
				</View>
			</Background>
		</SafeAreaView>
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
