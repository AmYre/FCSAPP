import { View, ScrollView, TouchableOpacity, Text, Image, ImageBackground, StyleSheet, Linking, Share } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Background from "../components/background";
import HeaderVideo from "../components/headerVideo";
import InterimVideo from "../components/interimVideo";
import BlogSlider from "../components/slider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const openLink = (url: string) => {
		Linking.openURL(url);
	};
	const navigation = useNavigation();

	const openShare = async (message) => {
		try {
			await Share.share({
				message: message,
			});
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<Background>
			<ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
				<SafeAreaView>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate("section")}>
							<FontAwesome6 name="hand-fist" size={38} color="white" style={styles.leftIcon} />
							<Text style={styles.buttonText}>CRÉER SECTION</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.rightButton} onPress={() => openLink("https://commerces-services.unsa.org/adhesion/")}>
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
					<View>
						<ImageBackground source={require("../assets/images/tpe-section.jpg")} style={styles.imageBackground}>
							<View style={styles.overlay}>
								<Text style={styles.imageTitle}>UNSA TPE</Text>
								<TouchableOpacity style={styles.buttonTPE} onPress={() => navigation.navigate("tpe")}>
									<Text style={styles.buttonTPEText}>Je m'informe</Text>
								</TouchableOpacity>
							</View>
						</ImageBackground>
					</View>
					<InterimVideo />
					<View>
						<ImageBackground source={require("../assets/images/droits.jpg")} style={styles.imageBackground}>
							<View style={styles.overlay}>
								<Text style={styles.imageTitle}>VOS DROITS</Text>
								<TouchableOpacity style={styles.buttonTPE} onPress={() => navigation.navigate("juri")}>
									<Text style={styles.buttonTPEText}>Je m'informe</Text>
								</TouchableOpacity>
							</View>
						</ImageBackground>
					</View>
					<View style={styles.sectionSocial}>
						<Text style={styles.sectionTitleSocial}>Plus fort ensemble !</Text>
						<TouchableOpacity onPress={() => openShare("Découvrez notre application sur Facebook: https://www.facebook.com/unsa.fcs/")}>
							<FontAwesome5 style={styles.facebook} name="facebook" size={56} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openShare("Découvrez notre application sur Instagram: https://www.instagram.com/unsafcs/")}>
							<FontAwesome5 style={styles.insta} name="instagram" size={56} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openShare("Découvrez notre application sur LinkedIn: https://www.linkedin.com/in/fatiha-hiraki-775534124/")}>
							<FontAwesome5 style={styles.linkedin} name="linkedin" size={56} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openShare("Découvrez notre application sur Twitter: https://x.com/UnsaFcs")}>
							<FontAwesome5 style={styles.twitter} name="twitter" size={56} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openShare("Découvrez notre application sur TikTok: https://www.tiktok.com/@fcs.unsa")}>
							<FontAwesome5 style={styles.tiktok} name="tiktok" size={56} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openShare("Découvrez notre application sur YouTube: https://www.youtube.com/channel/UCBcaU-snW_BHsJJvwekDHrA")}>
							<FontAwesome5 style={styles.youtube} name="youtube" size={56} color="white" />
						</TouchableOpacity>
					</View>
					{/* <View style={styles.sectionPartners}>
					<Text style={styles.sectionTitle}>Nos Partenaires</Text>
					<TouchableOpacity onPress={() => openLink("https://www.malakoffhumanis.com/")}>
						<ImageBackground resizeMode="contain" style={styles.malakoff} source={require("../assets/images/malakoff.jpg")} />
					</TouchableOpacity>
					<View style={styles.line1}>
						<TouchableOpacity style={styles.humanisContainer} onPress={() => openLink("https://www.malakoffhumanis.com/")}>
							<Image style={styles.humanis} source={require("../assets/images/humanis.jpg")} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.ocirpContainer} onPress={() => openLink("https://www.ocirp.fr/")}>
							<Image style={styles.ocirp} source={require("../assets/images/ocirp.jpg")} />
						</TouchableOpacity>
					</View>
					<View style={styles.line2}>
						<TouchableOpacity style={styles.klesiaContainer} onPress={() => openLink("https://www.klesia.fr/")}>
							<Image style={styles.klesia} source={require("../assets/images/klesia.jpg")} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.vyvContainer} onPress={() => openLink("https://www.groupe-vyv.fr/")}>
							<Image style={styles.vyv} source={require("../assets/images/vyv.jpg")} />
						</TouchableOpacity>
					</View>
					<View style={styles.line3}>
						<TouchableOpacity style={styles.apicilContainer} onPress={() => openLink("https://mon.apicil.com/")}>
							<Image style={styles.apicil} source={require("../assets/images/apicil.jpg")} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.ag2rContainer} onPress={() => openLink("https://www.ag2rlamondiale.fr/")}>
							<Image style={styles.ag2r} source={require("../assets/images/ag2r.jpg")} />
						</TouchableOpacity>
					</View>
				</View> */}
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
		paddingBottom: 50,
	},
	banner: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	section: {
		padding: 16,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.55)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		marginTop: 10,
		marginBottom: 10,
		color: "#FFF",
	},
	sectionImage: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
		borderRadius: 8,
	},
	video: {
		width: "100%",
		height: 200,
	},
	socialLinks: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 16,
	},
	partners: {
		padding: 16,
		alignItems: "center",
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
	imageBackground: {
		width: "100%",
		height: 300,
		resizeMode: "cover",
	},
	overlay: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	imageTitle: {
		color: "#FFF",
		fontSize: 38,
		fontWeight: "bold",
		textShadowColor: "rgba(0, 0, 0, 0.65)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
	},
	buttonTPE: {
		width: "50%",
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
		borderColor: "#00A3E9",
		borderWidth: 2,
	},
	buttonTPEText: {
		fontSize: 18,
		color: "#00A3E9",
		fontWeight: "bold",
		textAlign: "center",
	},
	videoINTERIM: {
		width: "100%",
		height: 300,
	},
	sectionSocial: {
		padding: 16,
		height: 300,
	},
	sectionTitleSocial: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.55)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		marginTop: 10,
		color: "#FFF",
	},
	facebook: {
		position: "absolute",
		left: "14%",
		top: 20,
	},
	insta: {
		position: "absolute",
		left: "45%",
		top: 90,
	},
	linkedin: {
		position: "absolute",
		left: "75%",
		top: 40,
	},
	twitter: {
		position: "absolute",
		left: "6%",
		top: 130,
	},
	tiktok: {
		position: "absolute",
		left: "33%",
		top: 200,
	},
	youtube: {
		position: "absolute",
		left: "63%",
		top: 180,
	},
	sectionPartners: {
		marginTop: 20,
	},
	malakoff: {
		width: "100%",
		height: 100,
		backgroundColor: "#FFF",
	},
	humanisContainer: {
		width: "50%",
		height: 70,
	},
	ocirpContainer: {
		width: "50%",
		height: 70,
	},
	klesiaContainer: {
		width: "60%",
		height: 80,
	},
	vyvContainer: {
		width: "40%",
		height: 80,
	},
	apicilContainer: {
		width: "45%",
		height: 70,
	},
	ag2rContainer: {
		width: "55%",
		height: 70,
	},
	humanis: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	ocirp: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	klesia: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	vyv: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	apicil: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	ag2r: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	line1: {
		flexDirection: "row",
		width: "100%",
		backgroundColor: "#FFF",
	},
	line2: {
		flexDirection: "row",
		width: "100%",
		backgroundColor: "#FFF",
	},
	line3: {
		flexDirection: "row",
		width: "100%",
		backgroundColor: "#FFF",
	},
});
