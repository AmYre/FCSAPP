import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { decode } from "html-entities";
import Background from "@/components/background";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";

const NewsScreen = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				const response = await fetch("https://commerces-services.unsa.org/wp-json/wp/v2/posts?per_page=50");
				const data = await response.json();
				setBlogPosts(data);
				setFilteredPosts(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchBlogPosts();
	}, []);

	useEffect(() => {
		if (searchQuery) {
			const filtered = blogPosts.filter(
				(post) =>
					post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
					decode(post.excerpt.rendered.replace(/<[^>]+>/g, ""))
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			);
			setFilteredPosts(filtered);
		} else {
			setFilteredPosts(blogPosts);
		}
	}, [searchQuery, blogPosts]);

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("post", { post: item })}>
			<Image source={{ uri: item.yoast_head_json.og_image[0].url }} style={isIpad ? styles.imagePad : styles.image} />
			<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
				{item.title.rendered}
			</Text>
			<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
				{decode(item.excerpt.rendered.replace(/<[^>]+>/g, ""))}
			</Text>
		</TouchableOpacity>
	);

	if (loading) {
		return (
			<Background>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</Background>
		);
	} else {
		return (
			<Background>
				<SafeAreaView style={{ flex: 1 }}>
					<TextInput style={styles.searchInput} placeholder="Rechercher..." value={searchQuery} onChangeText={setSearchQuery} />

					<View style={styles.container}>
						{filteredPosts.length > 0 ? (
							<FlatList data={filteredPosts} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.flatListContent} />
						) : (
							<Text style={styles.noResultsText}>Aucun article trouvé</Text>
						)}
					</View>
				</SafeAreaView>
			</Background>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	searchInput: {
		paddingLeft: 30,
		paddingVertical: 10,
		color: "rgba(0, 0, 0, 0.65)",
		borderRadius: 10,
		backgroundColor: "#fff",
		margin: 30,
		boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.25)",
	},
	flatListContent: {
		paddingBottom: 20,
	},
	card: {
		width: 280,
		backgroundColor: "#fff",
		borderRadius: 10,
		overflow: "hidden",
		shadowColor: "rgba(0, 0, 0, 0.75)",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	cardPad: {
		width: 450,
		backgroundColor: "#fff",
		borderRadius: 10,
		overflow: "hidden",
		shadowColor: "rgba(0, 0, 0, 0.75)",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	image: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
	},
	imagePad: {
		width: "100%",
		height: 400,
		resizeMode: "cover",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#00A3E9",
		textAlign: "center",
		paddingRight: 20,
		paddingLeft: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		color: "#666",
		marginHorizontal: 10,
		marginBottom: 20,
		paddingRight: 10,
		paddingLeft: 10,
		textAlign: "justify",
	},
	noResultsText: {
		fontSize: 22,
		color: "#fff",
		textAlign: "center",
	},
});

export default NewsScreen;
