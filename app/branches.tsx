import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking, useWindowDimensions } from "react-native";
import Background from "@/components/background";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const alimentaire = [
	{ id: "leaf21", name: "Boulangerie", icon: "cutlery", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635886" },
	{ id: "leaf22", name: "Pâtisserie", icon: "birthday-cake", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635611" },
	{ id: "leaf23", name: "Charcuterie", icon: "cutlery", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635375" },
	{ id: "leaf24", name: "Poissonerie", icon: "tint", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635410" },
	{ id: "leaf25", name: "Boucherie", icon: "cutlery", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635593" },
	{ id: "leaf26", name: "Traiteurs", icon: "cutlery", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000020751473/?idConteneur=KALICONT000005635375" },
];

const detail = [
	{ id: "leaf31", name: "Habillement", icon: "shopping-bag", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635594" },
	{ id: "leaf32", name: "Sports Loisir", icon: "futbol-o", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635645" },
	{ id: "leaf33", name: "Chaussures", icon: "shopping-bag", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635629" },
	{ id: "leaf34", name: "Horlogerie Bijouterie", icon: "diamond", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635827" },
	{ id: "leaf35", name: "Optique", icon: "eye", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635912" },
	{ id: "leaf36", name: "Parfumerie", icon: "star", url: "https://code.travail.gouv.fr/convention-collective/3032-parfumerie-esthetique" },
	{ id: "leaf37", name: "Papeterie", icon: "pencil", url: "https://code.travail.gouv.fr/convention-collective/1539-papeterie-commerce-de-detail-de-papeterie-fournitures-de-bureau-bureaut" },
	{ id: "leaf38", name: "Librairie", icon: "book", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027180935" },
	{ id: "leaf39", name: "Mandataires", icon: "handshake-o", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005640320/" },
];

const services = [
	{ id: "leaf41", name: "Sécurité", icon: "shield", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635405" },
	{ id: "leaf42", name: "Propreté", icon: "leaf", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027172335" },
	{ id: "leaf43", name: "Interim", icon: "clock-o", url: "https://code.travail.gouv.fr/convention-collective/1413-salaries-permanents-des-entreprises-de-travail-temporaire" },
	{ id: "leaf44", name: "Médical", icon: "medkit", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005636023" },
	{ id: "leaf45", name: "Quincaillerie", icon: "wrench", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000047839180" },
	{ id: "leaf46", name: "Automobile", icon: "car", url: "https://code.travail.gouv.fr/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle" },
	{ id: "leaf47", name: "Pompes Funebres", icon: "heart", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635490" },
	{ id: "leaf48", name: "Désinfection 3D", icon: "fire", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635437" },
];

const commerces = [
	{ id: "leaf11", name: "Coiffure", icon: "scissors", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000018563755" },
	{ id: "leaf12", name: "Esthétique", icon: "star-o", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027065067" },
	{ id: "leaf13", name: "Couture Mode", icon: "shopping-bag", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635552" },
	{ id: "leaf14", name: "Fleuristes", icon: "leaf", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635507" },
];

const sections = [
	{ title: "Commerces", icon: "shopping-cart", color: "#00A3E9", data: commerces },
	{ title: "Artisanat Alimentaire", icon: "cutlery", color: "#E8764E", data: alimentaire },
	{ title: "Services", icon: "cogs", color: "#5B6ABF", data: services },
	{ title: "Commerce de Détail", icon: "tags", color: "#2EAD6D", data: detail },
];

const BranchItem = ({ item }) => (
	<TouchableOpacity
		style={styles.branchItem}
		onPress={() => Linking.openURL(item.url)}
		activeOpacity={0.7}
	>
		<View style={styles.branchIconWrap}>
			<FontAwesome name={item.icon} size={16} color="#00A3E9" />
		</View>
		<Text style={styles.branchName}>{item.name}</Text>
		<FontAwesome name="external-link" size={12} color="rgba(255,255,255,0.3)" />
	</TouchableOpacity>
);

const CollapsibleSection = ({ section, defaultOpen = false }) => {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<View style={styles.sectionWrap}>
			<TouchableOpacity
				style={styles.sectionHeader}
				onPress={() => setOpen(!open)}
				activeOpacity={0.8}
			>
				<LinearGradient
					colors={[section.color, `${section.color}88`]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.sectionGradient}
				>
					<View style={styles.sectionLeft}>
						<FontAwesome name={section.icon} size={18} color="#fff" />
						<Text style={styles.sectionTitle}>{section.title}</Text>
					</View>
					<View style={styles.sectionRight}>
						<View style={styles.countBadge}>
							<Text style={styles.countText}>{section.data.length}</Text>
						</View>
						<FontAwesome
							name={open ? "chevron-up" : "chevron-down"}
							size={14}
							color="rgba(255,255,255,0.8)"
						/>
					</View>
				</LinearGradient>
			</TouchableOpacity>
			{open && (
				<View style={styles.sectionBody}>
					{section.data.map((item) => (
						<BranchItem key={item.id} item={item} />
					))}
				</View>
			)}
		</View>
	);
};

const BranchesScreen = () => {
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	return (
		<Background>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.heroContainer}>
						<Image source={require("@/assets/images/branches.jpg")} style={isIpad ? styles.heroImagePad : styles.heroImage} />
						<LinearGradient
							colors={["transparent", "rgba(0,30,60,0.85)"]}
							style={styles.heroGradient}
						/>
						<View style={styles.heroContent}>
							<Text style={styles.heroTitle}>Branches Professionnelles</Text>
							<Text style={styles.heroSubtitle}>Conventions collectives & accords</Text>
						</View>
					</View>

					<View style={styles.content}>
						{sections.map((section, i) => (
							<CollapsibleSection key={section.title} section={section} defaultOpen={i === 0} />
						))}
					</View>

					<View style={{ height: 40 }} />
				</ScrollView>
			</SafeAreaView>
		</Background>
	);
};

const styles = StyleSheet.create({
	heroContainer: {
		position: "relative",
		height: 220,
	},
	heroImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	heroImagePad: {
		width: "100%",
		height: 350,
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
		bottom: 20,
		left: 0,
		right: 0,
		alignItems: "center",
	},
	heroTitle: {
		fontSize: 26,
		fontWeight: "800",
		color: "#fff",
		letterSpacing: 0.5,
		textAlign: "center",
	},
	heroSubtitle: {
		fontSize: 14,
		color: "rgba(255,255,255,0.75)",
		marginTop: 4,
		fontStyle: "italic",
	},
	content: {
		padding: 16,
	},
	sectionWrap: {
		marginBottom: 12,
		borderRadius: 14,
		overflow: "hidden",
	},
	sectionHeader: {
		borderRadius: 14,
		overflow: "hidden",
	},
	sectionGradient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 16,
		paddingHorizontal: 18,
	},
	sectionLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	sectionRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: "#fff",
	},
	countBadge: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 2,
	},
	countText: {
		fontSize: 12,
		fontWeight: "700",
		color: "#fff",
	},
	sectionBody: {
		backgroundColor: "rgba(15,20,40,0.85)",
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: "rgba(255,255,255,0.1)",
		borderBottomLeftRadius: 14,
		borderBottomRightRadius: 14,
	},
	branchItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "rgba(255,255,255,0.08)",
	},
	branchIconWrap: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: "rgba(0,163,233,0.12)",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	branchName: {
		flex: 1,
		fontSize: 15,
		color: "#fff",
		fontWeight: "500",
	},
});

export default BranchesScreen;
