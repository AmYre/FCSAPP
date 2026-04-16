import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet, Linking } from "react-native";
import { FontAwesome5, FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Background from "../components/background";
import HeaderVideo from "../components/headerVideo";
import BlogSlider from "../components/slider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const openLink = (url: string) => {
		Linking.openURL(url);
	};
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	return (
		<Background>
			<ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
				<SafeAreaView>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate("section")}>
							<FontAwesome6 name="hand-fist" size={38} color="white" style={styles.leftIcon} />
							<Text style={styles.buttonText}>CRÉER SECTION</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.rightButton} onPress={() => openLink("https://adh.unsa-fcs.fr/")}>
							<FontAwesome5 name="file-signature" size={34} color="white" style={styles.rightIcon} />
							<Text style={styles.buttonText}>ADHÉSION EN LIGNE</Text>
						</TouchableOpacity>
					</View>
					<HeaderVideo />

					{/* News Section */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Ne ratez rien de l’actualité</Text>
						<BlogSlider />
					</View>

					{/* Quick Access Cards */}
					<View style={styles.cardsSection}>
						<Text style={styles.sectionTitle}>Accès rapide</Text>
						<View style={styles.cardsGrid}>
							<TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate("tpe")} activeOpacity={0.85}>
								<Image source={require("../assets/images/tpe-section.jpg")} style={styles.quickCardImage} />
								<LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.quickCardGradient} />
								<View style={styles.quickCardContent}>
									<View style={styles.quickCardIconWrap}>
										<FontAwesome5 name="store" size={16} color="#fff" />
									</View>
									<Text style={styles.quickCardTitle}>UNSA TPE</Text>
									<Text style={styles.quickCardSub}>Élections & infos TPE</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate("juri")} activeOpacity={0.85}>
								<Image source={require("../assets/images/droits.jpg")} style={styles.quickCardImage} />
								<LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.quickCardGradient} />
								<View style={styles.quickCardContent}>
									<View style={styles.quickCardIconWrap}>
										<FontAwesome5 name="balance-scale" size={16} color="#fff" />
									</View>
									<Text style={styles.quickCardTitle}>Vos Droits</Text>
									<Text style={styles.quickCardSub}>Infos juridiques</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={styles.cardsGrid}>
							<TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate("books")} activeOpacity={0.85}>
								<Image source={require("../assets/images/books.jpg")} style={styles.quickCardImage} />
								<LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.quickCardGradient} />
								<View style={styles.quickCardContent}>
									<View style={styles.quickCardIconWrap}>
										<FontAwesome5 name="heart" size={16} color="#fff" />
									</View>
									<Text style={styles.quickCardTitle}>Mes Articles</Text>
									<Text style={styles.quickCardSub}>Articles sauvegardés</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate("branches")} activeOpacity={0.85}>
								<Image source={require("../assets/images/branches.jpg")} style={styles.quickCardImage} />
								<LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.quickCardGradient} />
								<View style={styles.quickCardContent}>
									<View style={styles.quickCardIconWrap}>
										<FontAwesome5 name="sitemap" size={16} color="#fff" />
									</View>
									<Text style={styles.quickCardTitle}>Branches</Text>
									<Text style={styles.quickCardSub}>Conventions collectives</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>

					{/* Contact Banner */}
					<View style={styles.contactBanner}>
						<LinearGradient
							colors={["#00A3E9", "#272F6B"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.contactGradient}
						>
							<FontAwesome5 name="headset" size={28} color="#fff" />
							<View style={styles.contactText}>
								<Text style={styles.contactTitle}>Besoin d'aide ?</Text>
								<Text style={styles.contactSub}>Notre équipe juridique est à votre écoute</Text>
							</View>
							<TouchableOpacity style={styles.contactBtn} onPress={() => navigation.navigate("contact")}>
								<Text style={styles.contactBtnText}>Contacter</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>

					{/* Social Section */}
					<View style={styles.socialSection}>
						<Text style={styles.sectionTitle}>Rejoignez-nous</Text>
						<Text style={styles.socialSubtitle}>Suivez l'UNSA FCS sur les réseaux</Text>
						<View style={styles.socialRow}>
							{[
								{ name: "facebook", color: "#1877F2", url: "https://www.facebook.com/unsa.fcs/" },
								{ name: "instagram", color: "#E4405F", url: "https://www.instagram.com/unsafcs/" },
								{ name: "linkedin", color: "#0A66C2", url: "https://www.linkedin.com/in/fatiha-hiraki-775534124/" },
								{ name: "tiktok", color: "#000", url: "https://www.tiktok.com/@fcs.unsa" },
								{ name: "youtube", color: "#FF0000", url: "https://www.youtube.com/channel/UCBcaU-snW_BHsJJvwekDHrA" },
							].map((s) => (
								<TouchableOpacity
									key={s.name}
									style={[styles.socialBtn, { backgroundColor: s.color }]}
									onPress={() => openLink(s.url)}
									activeOpacity={0.8}
								>
									<FontAwesome5 name={s.name} size={20} color="#fff" />
								</TouchableOpacity>
							))}
						</View>
					</View>

					<View style={{ height: 30 }} />
				</SafeAreaView>
			</ScrollView>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginVertical: 40,
	},
	leftButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#00A3E9",
		padding: 15,
		borderRadius: 5,
		width: "45%",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: "#FFF",
	},
	rightButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#DA2E2E",
		padding: 15,
		borderRadius: 5,
		width: "45%",
		justifyContent: "center",
	},
	leftIcon: {
		position: "absolute",
		left: -10,
	},
	rightIcon: {
		position: "absolute",
		left: -10,
	},
	buttonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
	section: {
		padding: 16,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: "800",
		textAlign: "center",
		color: "#FFF",
		marginBottom: 14,
		letterSpacing: 0.3,
	},
	cardsSection: {
		paddingHorizontal: 12,
		paddingTop: 10,
	},
	cardsGrid: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 10,
	},
	quickCard: {
		flex: 1,
		height: 160,
		borderRadius: 14,
		overflow: "hidden",
		position: "relative",
	},
	quickCardImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	quickCardGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "70%",
	},
	quickCardContent: {
		position: "absolute",
		bottom: 12,
		left: 12,
		right: 12,
	},
	quickCardIconWrap: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "rgba(0,163,233,0.5)",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 6,
	},
	quickCardTitle: {
		fontSize: 16,
		fontWeight: "800",
		color: "#fff",
	},
	quickCardSub: {
		fontSize: 12,
		color: "rgba(255,255,255,0.7)",
		marginTop: 2,
	},
	contactBanner: {
		marginHorizontal: 12,
		marginTop: 20,
		borderRadius: 14,
		overflow: "hidden",
	},
	contactGradient: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 18,
		paddingHorizontal: 18,
		gap: 14,
	},
	contactText: {
		flex: 1,
	},
	contactTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: "#fff",
	},
	contactSub: {
		fontSize: 12,
		color: "rgba(255,255,255,0.8)",
		marginTop: 2,
	},
	contactBtn: {
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	contactBtnText: {
		fontSize: 13,
		fontWeight: "700",
		color: "#272F6B",
	},
	socialSection: {
		alignItems: "center",
		marginTop: 28,
		paddingHorizontal: 16,
	},
	socialSubtitle: {
		fontSize: 13,
		color: "rgba(255,255,255,0.6)",
		marginBottom: 18,
		fontStyle: "italic",
	},
	socialRow: {
		flexDirection: "row",
		gap: 14,
	},
	socialBtn: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
	},
});
