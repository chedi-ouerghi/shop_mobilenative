import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Modal, Pressable, Button } from 'react-native';
import { products } from '../data';
import moment from 'moment'; 

const ListProduct = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showRecent, setShowRecent] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Extract unique categories for dropdown
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Function to filter products based on dateAdded
  const getRecentProducts = () => {
    const oneMonthAgo = moment().subtract(1, 'months').startOf('day').toDate();
    return products.filter(product => new Date(product.dateAdded) >= oneMonthAgo);
  };

  // Filter and sort products based on search query, category, and sort order
  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  // Get recent products
  const recentProducts = getRecentProducts();

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', { product: item })}
      style={styles.productCard}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
<View style={styles.header}>
  <TextInput
    style={styles.searchBar}
    placeholder="Rechercher un produit"
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
  <TouchableOpacity
    style={styles.button}
    onPress={() => setCategoryModalVisible(true)}
  >
    <Text style={styles.buttonText}>{selectedCategory}</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.button, styles.sortButton]} // Utiliser les styles spécifiques pour le bouton de tri
    onPress={() => setSortModalVisible(true)}
  >
    <Text style={styles.sortButtonText}>
      {sortOrder === 'asc' ? 'Price: Low to High' : 'Price: High to Low'}
    </Text>
  </TouchableOpacity>
  <Button
    title={showRecent ? 'Show All' : 'Show Recent'}
    onPress={() => setShowRecent(!showRecent)}
  />
</View>


      {/* Category Modal */}
      <Modal
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {categories.map((category, index) => (
              <Pressable
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedCategory(category);
                  setCategoryModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{category}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalOption}
              onPress={() => {
                setSortOrder('asc');
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Price: Low to High</Text>
            </Pressable>
            <Pressable
              style={styles.modalOption}
              onPress={() => {
                setSortOrder('desc');
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Price: High to Low</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={showRecent ? recentProducts : filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2} // Deux éléments par ligne
        columnWrapperStyle={styles.row} // Style pour les lignes pour ajouter un espacement
        showsVerticalScrollIndicator={true} // Assurez-vous que l'indicateur de défilement vertical est affiché
        onEndReached={() => console.log('End reached')}
        onEndReachedThreshold={0.1} // Déclenchement du défilement automatique lorsque 10% du contenu est visible
      />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingBottom: 150,
    },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
    paddingHorizontal: 10, // Ajouter un padding horizontal pour espacer les éléments des bords
  },
  searchBar: {
    height: 40,
    width: '60%', // Ajuster la largeur de la barre de recherche
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#fff', // Fond blanc pour l'entrée
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: '#ddd', // Couleur de fond des boutons
    borderColor: '#0056b3', // Couleur de la bordure des boutons
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000', // Couleur du texte des boutons
  },
  sortButton: {
    height: 40,
    width: 150, // Largeur différente pour le bouton de tri
    backgroundColor: '#ddd', // Couleur de fond différente pour le bouton de tri
  },
  sortButtonText: {
    fontSize: 16,
    color: '#000', // Couleur du texte du bouton de tri
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  modalOption: {
    padding: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  row: {
    justifyContent: 'space-between', // Aligner les éléments avec de l'espace entre eux
    marginBottom: 16,
  },
  productCard: {
    width: 170, // Largeur fixe pour chaque carte
    height: 250, // Hauteur fixe pour chaque carte
    margin: 5, // Ajouter une marge pour créer un écart
    backgroundColor: '#fff', // Fond blanc pour la carte
    padding: 16,
    borderRadius: 12, // Coins arrondis
    elevation: 4, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImage: {
    width: '100%',
    height: 115, // Hauteur fixe pour l'image
    borderRadius: 8, // Coins arrondis pour l'image
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    flex: 1, // Permet au texte de s'ajuster à l'espace restant
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});


export default ListProduct;
