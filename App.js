import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import AddRecipeModal from './components/AddRecipeModal';

const initialRecipes = [
  { title: 'Pasta Carbonara', ingredients: ['400g Pasta', '200g Bacon', '4Eggs', '150g Parmesan'] },
  { title: 'Chocolate Chip Cookies', ingredients: ['4dl Flour', '2dl Sugar', '100g Butter', '40g Chocolate Chips'] },
  { title: 'Potato gnocchi', ingredients: ['red delight potato', 'plain flour', 'egg', 'salt and pepper'] },
  { title: 'Coconut Jam Drops', ingredients: ['condensed milk', 'desiccated coconut', 'Strawberry jam', 'Salt'] },
  { title: 'Easy Pizza', ingredients: ['self-raising flour', 'parmesan cheese', 'vegetable oil', 'boiling water'] },
];


export default function App() {
  const [displayedRecipes, setDisplayedRecipes] = useState(initialRecipes);
  const [isDisplayingFavorites, setIsDisplayingFavorites] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRecipes, setNewRecipes] = useState([]);
  const [activeView, setActiveView] = useState('Alla');

const handleViewSwitch = () => {
  setActiveView((prevView) => (prevView === 'Alla' ? 'Favoriter' : 'Alla'));
};

  const handleAllRecipes = () => {
    setDisplayedRecipes([...initialRecipes, ...newRecipes]);
    setIsDisplayingFavorites(false);
  };

  useEffect(() => {
    if (isDisplayingFavorites) {
      setDisplayedRecipes(favoriteRecipes);
    } else {
      setDisplayedRecipes([...initialRecipes, ...newRecipes]);
    }
  }, [isDisplayingFavorites, newRecipes]);

  useEffect(() => {
    if (isDisplayingFavorites) {
      setDisplayedRecipes(favoriteRecipes);
    }
  }, [favoriteRecipes]);

  const handleFavoriteRecipes = () => {
    setDisplayedRecipes(favoriteRecipes);
    setIsDisplayingFavorites(true);
  };

  const handleRemoveFavorite = (recipe) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((favRecipe) => favRecipe.title !== recipe.title)
    );
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={[styles.recipeItem, styles.recipeContainer]}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeIngredients}>{item.ingredients.join(', ')}</Text>
      {isDisplayingFavorites && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.favoriteButton, styles.removeButton]}
            onPress={() => handleRemoveFavorite(item)}
          >
            <Text style={styles.favoriteButtonText}>Ta bort</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const toggleFavorite = (recipe) => {
    const isFavorite = favoriteRecipes.some((favRecipe) => favRecipe.title === recipe.title);

    if (isFavorite) {
      setFavoriteRecipes((prevFavorites) =>
        prevFavorites.filter((favRecipe) => favRecipe.title !== recipe.title)
      );
    } else {
      setFavoriteRecipes((prevFavorites) => [...prevFavorites, recipe]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.recipeItem, styles.recipeContainer]}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeIngredients}>{item.ingredients.join(', ')}</Text>
      {!isDisplayingFavorites && (
        <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item)}>
          <Text style={styles.favoriteButtonText}>Favorite</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const handleAddRecipe = (newRecipe) => {
    setNewRecipes((prevNewRecipes) => [...prevNewRecipes, newRecipe]);
    setIsModalVisible(false);
  };

  return (
      <View style={styles.container}>
        <View style={styles.recipeHeader}>
          <TouchableOpacity
            style={[styles.tabButton, activeView === 'Alla' ? styles.activeTabButton : null]}
            onPress={() => {
              handleAllRecipes();
              handleViewSwitch();
            }}
          >
            <Text style={styles.tabButtonText}>Alla</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeView === 'Favoriter' ? styles.activeTabButton : null]}
            onPress={() => {
              handleFavoriteRecipes();
              handleViewSwitch();
            }}
          >
            <Text style={styles.tabButtonText}>Favoriter</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Recept</Text>
        <FlatList
          data={displayedRecipes}
          renderItem={isDisplayingFavorites ? renderFavoriteItem : renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.addButtonText}>Lägg till recept</Text>
        </TouchableOpacity>
        <AddRecipeModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddRecipe={handleAddRecipe}
        />
      </View>
  );

}

const styles = StyleSheet.create({
  recipeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 8,
    padding: 16, 
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    padding: 16,
  },
  title: {
    color: 'black', 
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  recipeItem: {
    marginBottom: 16,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  tabButton: {
    backgroundColor: '#ABB0B8', 
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 65,
  },
  tabButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  recipeTitle: {
    color: 'black', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  recipeIngredients: {
    color: '#666666', 
  },
  favoriteButton: {
    backgroundColor: '#ff4081', 
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  favoriteButtonText: {
    color: 'white', 
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#50C878',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white', 
    textAlign: 'center',
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 64, 129, 0.3)', 
  },
});
