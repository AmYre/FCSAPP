import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Background from "@/components/background";
import { FontAwesome } from "@expo/vector-icons";

const HierarchyNode = ({ node, depth = 0 }) => {
	const [isExpanded, setIsExpanded] = useState(node.name === "UNSA FCS");

	const hasChildren = node.children && node.children.length > 0;

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<View style={[styles.nodeContainer, { paddingLeft: depth * 20 }]}>
			<TouchableOpacity onPress={toggleExpand} style={styles.node}>
				{/* Chevron icon */}
				{hasChildren ? isExpanded ? <FontAwesome name="chevron-down" size={20} color="blue" /> : <FontAwesome name="chevron-right" size={20} color="blue" /> : null}

				{/* Node text */}
				<Text style={[styles.nodeText, { fontWeight: hasChildren ? "bold" : "normal" }]}>{node.name}</Text>
			</TouchableOpacity>

			{/* Render children if expanded */}
			{hasChildren && isExpanded && (
				<View style={styles.childContainer}>
					{node.children.map((child) => (
						<HierarchyNode key={child.id} node={child} depth={depth + 1} />
					))}
				</View>
			)}
		</View>
	);
};

const data = [
	{
		id: "root",
		name: "UNSA FCS",
		children: [
			{
				id: "branch1",
				name: "Commerces Artisanat",
				children: [
					{ id: "leaf11", name: "Coiffure" },
					{ id: "leaf12", name: "Esthétique" },
					{ id: "leaf13", name: "Couture Mode" },
					{ id: "leaf14", name: "Fleuristes Animaliers" },
				],
			},
			{
				id: "branch2",
				name: "Artisanat Alimentaires",
				children: [
					{ id: "leaf21", name: "Boulangerie" },
					{ id: "leaf22", name: "Pâtisserie" },
					{ id: "leaf23", name: "Charcuterie" },
					{ id: "leaf24", name: "Poissonerie" },
					{ id: "leaf25", name: "Boucherie" },
					{ id: "leaf26", name: "Traiteurs" },
				],
			},
			{
				id: "branch3",
				name: "Commerces de détails",
				children: [
					{ id: "leaf31", name: "Habillement" },
					{ id: "leaf32", name: "Sports Loisir" },
					{ id: "leaf33", name: "Chaussures" },
					{ id: "leaf34", name: "Horlogerie Bijouterie" },
					{ id: "leaf35", name: "Optique" },
					{ id: "leaf36", name: "Parfumerie" },
					{ id: "leaf37", name: "Papeterie" },
					{ id: "leaf38", name: "Librairie" },
					{ id: "leaf39", name: "Gérants mandataires" },
				],
			},
			{
				id: "branch4",
				name: "Commerces de services",
				children: [
					{ id: "leaf41", name: "Prévention sécurité" },
					{ id: "leaf42", name: "Propreté" },
					{ id: "leaf43", name: "Trvail temporaire" },
					{ id: "leaf44", name: "Médico Technique" },
					{ id: "leaf45", name: "Quincaillerie" },
					{ id: "leaf46", name: "Service de l'Automobile" },
					{ id: "leaf47", name: "Pompes funebres" },
					{ id: "leaf48", name: "Désinfection 3D" },
				],
			},
		],
	},
];

const BranchesScreen = () => {
	return (
		<Background>
			<ScrollView style={styles.container}>
				{data.map((node) => (
					<HierarchyNode key={node.id} node={node} />
				))}
			</ScrollView>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		marginBottom: 20,
	},
	nodeContainer: {
		marginBottom: 10,
	},
	node: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
	},
	nodeText: {
		fontSize: 16,
		color: "#fff",
	},
	childContainer: {
		paddingLeft: 20,
	},
});

export default BranchesScreen;
