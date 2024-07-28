import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Modal, Pressable, Button, ScrollView } from 'react-native';
import { SharedElement } from 'react-native-shared-element';
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
      <SharedElement id={`item.${item.id}.photo`}>
        <Image source={item.image} style={styles.productImage} />
      </SharedElement>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  const renderEmptyMessage = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Aucun produit trouvé pour cette recherche.</Text>
    </View>
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOrder('asc');
    setShowRecent(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaders}>
        <View style={styles.headerSearchBar}>
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher un produit"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button
              title="Reset Filters"
              onPress={resetFilters}
            />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.header}>
          <View style={styles.FiltreSection}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCategoryModalVisible(true)}
            >
              <Text style={styles.buttonText}>{selectedCategory}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.sortButton]}
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
        </ScrollView>
      </View>

      {/* Category Modal */}
      <Modal
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <Pressable style={styles.modalContainer} onPress={() => setCategoryModalVisible(false)}>
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
        </Pressable>
      </Modal>

      {/* Sort Modal */}
      <Modal
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <Pressable style={styles.modalContainer} onPress={() => setSortModalVisible(false)}>
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
        </Pressable>
      </Modal>

       <View style={styles.containerList}>
      <FlatList
        data={showRecent ? recentProducts : filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={renderEmptyMessage}
        onEndReached={() => console.log('End reached')}
        onEndReachedThreshold={0.1}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  padding: 2, // Augmenter la valeur de padding pour plus d'espace intérieur
  backgroundColor: '#fff', // Changer la couleur de fond pour un look plus propre
  paddingBottom: 120, // Maintenir cette valeur pour le bas de la page
  borderRadius: 25, // Ajuster la valeur pour des coins moins arrondis
  shadowColor: '#000', // Ajouter une ombre pour un effet de profondeur
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5, // Augmenter l'élévation pour un effet d'ombre plus prononcé sur Android
  width: '95%', // Ajuster la largeur
  position: 'relative',
  left: '2.5%', // Centrer le conteneur horizontalement
},
  containerList: {
    backgroundColor: '#ffffff',
    paddingBottom: 250,
  },
  containerHeaders: {
    flex: 0,
    paddingBottom: 15,
  shadowColor: '#000', // Ajouter une ombre pour un effet de profondeur
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  },
  headerSearchBar: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: 70,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100,
    paddingHorizontal: 10,
    marginRight: 10,
    width: '50%',
    height: '100%',
    marginLeft:'1%'
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 100,
    marginTop:'1%'
  },
  FiltreSection: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  sortButton: {
    backgroundColor: '#fff',
  },
  sortButtonText: {
    color: '#000',
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default ListProduct;
