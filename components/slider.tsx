import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchArticles } from "@/utils/parseArticles";

const BlogSlider = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				console.log("🔄 Chargement des posts...");
				const articles = await fetchArticles();
				console.log(`✅ ${articles.length} posts chargés`);

				if (articles.length > 0) {
					console.log("🔍 Premier post:", articles[0].title);
				}

				setBlogPosts(articles);
				setLoading(false);
			} catch (error) {
				console.error("❌ Erreur lors du chargement des posts:", error);
				setLoading(false);
			}
		};

		fetchBlogPosts();
	}, []);

	const renderItem = ({ item }) => {
		if (!item) return null;

		return (
			<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("post", { post: item })}>
				{item.imageUrl ? (
					<Image source={{ uri: item.imageUrl }} style={styles.image} />
				) : (
					<View style={[styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
						<Text style={{ color: '#999', fontSize: 12 }}>Pas d'image</Text>
					</View>
				)}
				<Text style={styles.date}>{item.date}</Text>
				<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
					{item.title}
				</Text>
				<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
					{item.excerpt}
				</Text>
			</TouchableOpacity>
		);
	};

	if (loading) {
		return (
			<View style={{ padding: 20 }}>
				<ActivityIndicator size="large" color="#00A3E9" />
				<Text style={{ textAlign: 'center', marginTop: 10, color: '#666' }}>Chargement des actualités...</Text>
			</View>
		);
	}

	if (blogPosts.length === 0) {
		return (
			<View style={{ padding: 20 }}>
				<Text style={{ textAlign: 'center', color: '#666' }}>Aucune actualité disponible</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={blogPosts}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.slider}
		/>
	);
};

const styles = StyleSheet.create({
	slider: {
		paddingVertical: 20,
	},
	card: {
		width: 250,
		marginHorizontal: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
		overflow: "hidden",
		shadowColor: "rgba(0, 0, 0, 0.75)",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
	},
	image: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
	},
	date: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#fff",
		backgroundColor: "#00A3E9",
		alignSelf: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 5,
		marginLeft: 10,
		marginTop: 10,
		overflow: "hidden",
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
});

export default BlogSlider;
