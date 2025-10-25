import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { decode } from "html-entities";

const BlogSlider = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				console.log("🔄 Chargement des posts...");
				const response = await fetch("https://commerces-services.unsa.org/wp-json/wp/v2/posts?_embed");

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				console.log(`✅ ${data.length} posts chargés`);

				if (data.length > 0) {
					console.log("🔍 Premier post:", data[0]?.title?.rendered);
					console.log("🔍 Featured media:", data[0]?._embedded?.['wp:featuredmedia']?.[0]?.source_url);
				}

				setBlogPosts(data);
				setLoading(false);
			} catch (error) {
				console.error("❌ Erreur lors du chargement des posts:", error);
				setLoading(false);
			}
		};

		fetchBlogPosts();
	}, []);

	const renderItem = ({ item }) => {
		// Vérification de sécurité pour éviter les crashes
		const imageUrl = item?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
		const title = item?.title?.rendered ? decode(item.title.rendered.replace(/<[^>]+>/g, "")) : 'Sans titre';
		const excerpt = item?.excerpt?.rendered ? decode(item.excerpt.rendered.replace(/<[^>]+>/g, "")) : '';

		// Debug: log pour voir si l'item est défini
		if (!item) {
			console.log("⚠️ Item undefined dans renderItem");
			return null;
		}

		return (
			<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("post", { post: item })}>
				{imageUrl ? (
					<Image source={{ uri: imageUrl }} style={styles.image} />
				) : (
					<View style={[styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
						<Text style={{ color: '#999', fontSize: 12 }}>Pas d'image</Text>
					</View>
				)}
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{title}
				</Text>
				<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
					{excerpt}
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
			keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
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
