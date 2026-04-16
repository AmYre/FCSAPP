import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Linking, ActivityIndicator, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHtml from "react-native-render-html";
import { useRoute } from "@react-navigation/native";
import Background from "../components/background";
import { useWindowDimensions } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { decode } from "html-entities";
import { LinearGradient } from "expo-linear-gradient";

const BASE_URL = "https://unsa-fcs.fr";

const parseArticleContent = (html) => {
	const proseMatch = html.match(/<div[^>]*class="[^"]*prose[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/);
	if (proseMatch) return proseMatch[1];

	const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
	if (articleMatch) return articleMatch[1];

	return null;
};

const PostDetail = () => {
	const route = useRoute();
	const { post } = route.params;
	const [isLiked, setIsLiked] = useState(false);
	const [articleContent, setArticleContent] = useState(null);
	const [loadingContent, setLoadingContent] = useState(true);
	const scrollY = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const checkLiked = async () => {
			try {
				const liked = await AsyncStorage.getItem(`saved_${post.id}`);
				setIsLiked(liked !== null);
			} catch (error) {
				console.error("Error checking liked:", error);
			}
		};
		checkLiked();
	}, [post.id]);

	useEffect(() => {
		const fetchArticleContent = async () => {
			try {
				const url = post.link || `${BASE_URL}${post.slug}`;
				const response = await fetch(url);
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				const html = await response.text();
				const content = parseArticleContent(html);
				setArticleContent(content);
			} catch (error) {
				console.error("❌ Erreur chargement article:", error);
			} finally {
				setLoadingContent(false);
			}
		};
		fetchArticleContent();
	}, [post.slug]);

	const toggleLiked = async (liked, id) => {
		try {
			const storageKey = `saved_${id}`;
			if (liked) {
				await AsyncStorage.removeItem(storageKey);
			} else {
				await AsyncStorage.setItem(storageKey, JSON.stringify(post));
			}
			setIsLiked(!liked);
		} catch (error) {
			console.error("Error toggling like:", error);
		}
	};

	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	const tagsStyles = {
		p: {
			color: "#333",
			textAlign: "justify",
			fontSize: 15,
			lineHeight: 24,
			marginBottom: 12,
		},
		h1: {
			color: "#272F6B",
			textAlign: "left",
			fontSize: 22,
			fontWeight: "bold",
			marginTop: 16,
			marginBottom: 8,
		},
		h2: {
			color: "#272F6B",
			textAlign: "left",
			fontSize: 19,
			fontWeight: "bold",
			marginTop: 14,
			marginBottom: 6,
		},
		h3: {
			color: "#272F6B",
			textAlign: "left",
			fontSize: 17,
			fontWeight: "bold",
			marginTop: 12,
			marginBottom: 4,
		},
		ul: {
			color: "#333",
			textAlign: "justify",
			fontSize: 15,
		},
		li: {
			color: "#333",
			fontSize: 15,
			lineHeight: 24,
			marginBottom: 4,
		},
		strong: {
			color: "#272F6B",
			fontWeight: "bold",
		},
		a: {
			color: "#00A3E9",
			textDecorationLine: "underline",
		},
		div: {
			color: "#333",
			textAlign: "justify",
		},
		img: {
			borderRadius: 8,
			marginVertical: 10,
		},
	};

	const articleUrl = post.link || `${BASE_URL}${post.slug}`;
	const shareUrls = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
	};

	const shareNative = async () => {
		await Share.share({
			message: `${post.title}\n\n${articleUrl}`,
			url: articleUrl,
			title: post.title,
		});
	};

	const sharePost = async (platform) => {
		try {
			if (platform === "instagram" || platform === "tiktok") {
				await shareNative();
				return;
			}
			const url = shareUrls[platform];
			if (url) {
				const supported = await Linking.canOpenURL(url);
				if (supported) {
					await Linking.openURL(url);
				} else {
					await shareNative();
				}
			}
		} catch (error) {
			console.error("Error sharing:", error);
			try { await shareNative(); } catch (e) {}
		}
	};

	const imageScale = scrollY.interpolate({
		inputRange: [-100, 0],
		outputRange: [1.3, 1],
		extrapolateRight: "clamp",
	});

	const heroHeight = isIpad ? 350 : 260;

	return (
		<View style={styles.container}>
			{/* Hero image with parallax */}
			<Animated.View style={[styles.heroContainer, { height: heroHeight }]}>
				{post.imageUrl ? (
					<Animated.Image
						source={{ uri: post.imageUrl }}
						style={[styles.heroImage, { height: heroHeight, transform: [{ scale: imageScale }] }]}
					/>
				) : (
					<View style={[styles.heroImage, { height: heroHeight, backgroundColor: '#272F6B', justifyContent: 'center', alignItems: 'center' }]}>
						<FontAwesome name="newspaper-o" size={48} color="rgba(255,255,255,0.3)" />
					</View>
				)}
				<LinearGradient
					colors={["transparent", "rgba(0,0,0,0.7)"]}
					style={styles.heroGradient}
				/>
				{/* Date badge on hero */}
				{post.date ? (
					<View style={styles.dateBadge}>
						<FontAwesome name="calendar" size={11} color="#fff" style={{ marginRight: 6 }} />
						<Text style={styles.dateBadgeText}>{post.date}</Text>
					</View>
				) : null}
			</Animated.View>

			<Animated.ScrollView
				style={styles.scrollView}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={16}
			>
				{/* Spacer for hero */}
				<View style={{ height: heroHeight - 40 }} />

				{/* Content card */}
				<View style={styles.contentCard}>
					{/* Title */}
					<Text style={isIpad ? styles.titlePad : styles.title}>{post.title}</Text>

					{/* Divider */}
					<View style={styles.divider} />

					{/* Article body */}
					<View style={styles.articleBody}>
						{loadingContent ? (
							<View style={styles.loaderContainer}>
								<ActivityIndicator size="large" color="#00A3E9" />
								<Text style={styles.loaderText}>Chargement de l'article...</Text>
							</View>
						) : articleContent ? (
							<RenderHtml
								contentWidth={width - 48}
								source={{ html: articleContent }}
								tagsStyles={tagsStyles}
								enableExperimentalMarginCollapsing={true}
								ignoredDomTags={["svg", "path"]}
							/>
						) : (
							<Text style={styles.excerptFallback}>{post.excerpt}</Text>
						)}
					</View>

					{/* Share section */}
					<View style={styles.shareSection}>
						<Text style={styles.shareLabel}>Partager cet article</Text>
						<View style={styles.shareRow}>
							<TouchableOpacity style={[styles.shareBtn, { backgroundColor: '#3b5998' }]} onPress={() => sharePost("facebook")}>
								<FontAwesome name="facebook" color="#fff" size={18} />
							</TouchableOpacity>
							<TouchableOpacity style={[styles.shareBtn, { backgroundColor: '#0077b5' }]} onPress={() => sharePost("linkedin")}>
								<FontAwesome name="linkedin" color="#fff" size={18} />
							</TouchableOpacity>
							<TouchableOpacity style={[styles.shareBtn, { backgroundColor: '#1DA1F2' }]} onPress={() => sharePost("twitter")}>
								<FontAwesome name="twitter" color="#fff" size={18} />
							</TouchableOpacity>
							<TouchableOpacity style={[styles.shareBtn, { backgroundColor: '#C13584' }]} onPress={() => sharePost("instagram")}>
								<FontAwesome name="instagram" color="#fff" size={18} />
							</TouchableOpacity>
							<TouchableOpacity style={[styles.shareBtn, { backgroundColor: '#111' }]} onPress={() => sharePost("tiktok")}>
								<FontAwesome5 name="tiktok" color="#fff" size={16} />
							</TouchableOpacity>
						</View>
					</View>

					{/* Bottom spacing */}
					<View style={{ height: 40 }} />
				</View>
			</Animated.ScrollView>

			{/* Floating like button */}
			<TouchableOpacity
				style={styles.floatingLike}
				onPress={() => toggleLiked(isLiked, post.id)}
				activeOpacity={0.8}
			>
				<FontAwesome name="heart" size={22} color={isLiked ? "#f00" : "#ccc"} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	scrollView: {
		flex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	heroContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		overflow: "hidden",
	},
	heroImage: {
		width: "100%",
		resizeMode: "cover",
	},
	heroGradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 120,
	},
	dateBadge: {
		position: "absolute",
		top: 52,
		left: 16,
		backgroundColor: "rgba(0, 163, 233, 0.9)",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	dateBadgeText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	contentCard: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		minHeight: 500,
		paddingTop: 28,
		paddingHorizontal: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 8,
	},
	title: {
		fontSize: 18,
		color: "#272F6B",
		textTransform: "uppercase",
		fontWeight: "800",
		lineHeight: 26,
		letterSpacing: 0.3,
	},
	titlePad: {
		fontSize: 28,
		color: "#272F6B",
		textTransform: "uppercase",
		fontWeight: "800",
		lineHeight: 36,
		letterSpacing: 0.3,
	},
	divider: {
		height: 3,
		width: 60,
		backgroundColor: "#00A3E9",
		borderRadius: 2,
		marginTop: 14,
		marginBottom: 20,
	},
	articleBody: {
		paddingBottom: 10,
	},
	loaderContainer: {
		paddingVertical: 40,
		alignItems: "center",
	},
	loaderText: {
		marginTop: 12,
		color: "#999",
		fontSize: 14,
	},
	excerptFallback: {
		color: "#555",
		fontSize: 15,
		lineHeight: 24,
		textAlign: "justify",
	},
	shareSection: {
		borderTopWidth: 1,
		borderTopColor: "#eee",
		paddingTop: 20,
		marginTop: 10,
	},
	shareLabel: {
		fontSize: 14,
		fontWeight: "700",
		color: "#272F6B",
		textTransform: "uppercase",
		letterSpacing: 0.5,
		marginBottom: 14,
	},
	shareRow: {
		flexDirection: "row",
		gap: 12,
	},
	shareBtn: {
		width: 42,
		height: 42,
		borderRadius: 21,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 3,
	},
	floatingLike: {
		position: "absolute",
		bottom: 30,
		right: 20,
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 6,
	},
});

export default PostDetail;
