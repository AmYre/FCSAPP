import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform, useWindowDimensions } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Background from "@/components/background";
import { SafeAreaView } from "react-native-safe-area-context";

const features = [
	{ icon: "percent", iconSet: "fa", color: "#E8764E", title: "Réductions CE exclusives", desc: "Sorties, voyages, shopping… profitez d’avantages réservés aux adhérents." },
	{ icon: "balance-scale", iconSet: "fa5", color: "#5B6ABF", title: "Assistance juridique", desc: "Un accompagnement personnalisé pour défendre vos droits." },
	{ icon: "information-circle", iconSet: "ion", color: "#2EAD6D", title: "Vos droits", desc: "Restez informé de l’évolution de vos droits en temps réel." },
];

const FeatureCard = ({ item }: { item: any }) => {
	const renderIcon = () => {
		if (item.iconSet === "fa") return <FontAwesome name={item.icon} size={22} color="#fff" />;
		if (item.iconSet === "fa5") return <FontAwesome5 name={item.icon} size={22} color="#fff" />;
		return <Ionicons name={item.icon} size={26} color="#fff" />;
	};
	return (
		<View style={styles.featureCard}>
			<View style={[styles.featureIcon, { backgroundColor: item.color }]}>{renderIcon()}</View>
			<View style={styles.featureText}>
				<Text style={styles.featureTitle}>{item.title}</Text>
				<Text style={styles.featureDesc}>{item.desc}</Text>
			</View>
		</View>
	);
};

const TpeScreen = () => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	const handleSubmit = async () => {
		const mailtoUrl = `mailto:fcs@unsa.org?subject=Contact TPE&body=Nom : ${name}%0D%0AMessage : ${message}`;
		try {
			await Linking.openURL(mailtoUrl);
		} catch (error) {
			Alert.alert("Erreur", "Impossible d’ouvrir l’application mail");
		}
	};

	return (
		<Background>
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						{/* Hero */}
						<View style={styles.heroContainer}>
							<Image source={require("@/assets/images/tpe.png")} style={isIpad ? styles.heroImagePad : styles.heroImage} />
							<LinearGradient colors={["transparent", "rgba(0,30,60,0.9)"]} style={styles.heroGradient} />
							<View style={styles.heroContent}>
								<Text style={styles.heroTitle}>UNSA TPE</Text>
								<Text style={styles.heroSubtitle}>Au service des salariés des très petites entreprises</Text>
							</View>
						</View>

						{/* Intro */}
						<View style={styles.introSection}>
							<Text style={styles.introText}>
								À l’UNSA, nous sommes conscients des soucis que peuvent avoir les salariés, tous les salariés. C’est pour ça que nous avons créé UNSA TPE : pour apporter des solutions à plusieurs millions d’employés qui ne bénéficient pas des avantages de ceux qui travaillent dans des grands groupes.
							</Text>
						</View>

						{/* Features */}
						<View style={styles.featuresSection}>
							{features.map((f, i) => (
								<FeatureCard key={i} item={f} />
							))}
						</View>

						{/* CTA Vote */}
						<View style={styles.ctaBanner}>
							<LinearGradient
								colors={["#00A3E9", "#272F6B"]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={styles.ctaGradient}
							>
								<FontAwesome5 name="vote-yea" size={28} color="#fff" />
								<View style={styles.ctaTextWrap}>
									<Text style={styles.ctaTitle}>Élections TPE</Text>
									<Text style={styles.ctaSub}>Votez UNSA pour faire entendre votre voix</Text>
								</View>
							</LinearGradient>
						</View>

						{/* Contact Form */}
						<View style={styles.formSection}>
							<Text style={styles.formTitle}>Contactez-nous</Text>
							<Text style={styles.formSubtitle}>Une question ? Notre équipe vous répond</Text>

							<View style={styles.inputWrap}>
								<FontAwesome5 name="user" size={14} color="rgba(255,255,255,0.5)" style={styles.inputIcon} />
								<TextInput
									style={styles.input}
									placeholder="Votre nom"
									placeholderTextColor="rgba(255,255,255,0.5)"
									value={name}
									onChangeText={setName}
								/>
							</View>

							<View style={[styles.inputWrap, { height: 120, alignItems: "flex-start", paddingTop: 14 }]}>
								<FontAwesome5 name="comment-alt" size={14} color="rgba(255,255,255,0.5)" style={styles.inputIcon} />
								<TextInput
									style={[styles.input, { height: 100, textAlignVertical: "top" }]}
									placeholder="Votre message"
									placeholderTextColor="rgba(255,255,255,0.5)"
									value={message}
									onChangeText={setMessage}
									multiline
								/>
							</View>

							<TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
								<LinearGradient
									colors={["#00A3E9", "#0077CC"]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={styles.submitGradient}
								>
									<FontAwesome5 name="paper-plane" size={14} color="#fff" />
									<Text style={styles.submitText}>Envoyer</Text>
								</LinearGradient>
							</TouchableOpacity>
						</View>

						<View style={{ height: 40 }} />
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</Background>
	);
};

const styles = StyleSheet.create({
	heroContainer: {
		position: "relative",
		height: 250,
	},
	heroImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	heroImagePad: {
		width: "100%",
		height: 400,
		resizeMode: "cover",
	},
	heroGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "70%",
	},
	heroContent: {
		position: "absolute",
		bottom: 24,
		left: 0,
		right: 0,
		alignItems: "center",
	},
	heroTitle: {
		fontSize: 36,
		fontWeight: "900",
		color: "#fff",
		letterSpacing: 2,
	},
	heroSubtitle: {
		fontSize: 13,
		color: "rgba(255,255,255,0.8)",
		marginTop: 6,
		fontStyle: "italic",
		textAlign: "center",
		paddingHorizontal: 30,
	},
	introSection: {
		paddingHorizontal: 20,
		paddingVertical: 24,
	},
	introText: {
		fontSize: 15,
		color: "rgba(255,255,255,0.85)",
		lineHeight: 22,
		textAlign: "center",
	},
	featuresSection: {
		paddingHorizontal: 16,
		gap: 12,
	},
	featureCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.07)",
		borderRadius: 14,
		padding: 16,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.08)",
	},
	featureIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 14,
	},
	featureText: {
		flex: 1,
	},
	featureTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: "#fff",
		marginBottom: 4,
	},
	featureDesc: {
		fontSize: 13,
		color: "rgba(255,255,255,0.65)",
		lineHeight: 18,
	},
	ctaBanner: {
		marginHorizontal: 16,
		marginTop: 24,
		borderRadius: 14,
		overflow: "hidden",
	},
	ctaGradient: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 20,
		gap: 16,
	},
	ctaTextWrap: {
		flex: 1,
	},
	ctaTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: "#fff",
	},
	ctaSub: {
		fontSize: 13,
		color: "rgba(255,255,255,0.8)",
		marginTop: 2,
	},
	formSection: {
		marginHorizontal: 16,
		marginTop: 28,
		backgroundColor: "rgba(255,255,255,0.12)",
		borderRadius: 20,
		padding: 24,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.25)",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 24,
	},
	formTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: "#fff",
		textAlign: "center",
		marginBottom: 4,
	},
	formSubtitle: {
		fontSize: 13,
		color: "rgba(255,255,255,0.7)",
		textAlign: "center",
		marginBottom: 20,
	},
	inputWrap: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.1)",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.2)",
		paddingHorizontal: 14,
		marginBottom: 12,
		height: 48,
	},
	inputIcon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		color: "#fff",
		fontSize: 15,
	},
	submitBtn: {
		borderRadius: 12,
		overflow: "hidden",
		marginTop: 6,
	},
	submitGradient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		gap: 8,
	},
	submitText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "700",
	},
});

export default TpeScreen;
