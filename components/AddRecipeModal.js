import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const AddRecipeModal = ({ isVisible, onClose, onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleAddRecipe = () => {
    if (title.trim() === '' || ingredients.trim() === '') {
      alert('Fyll i både titel och ingredienser.');
      return;
    }

    const newRecipe = { title, ingredients: ingredients.split(',') };
    onAddRecipe(newRecipe);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Lägg till recept</Text>
          <TextInput
            style={styles.input}
            placeholder="Titel"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredienser (separera med komma)"
            value={ingredients}
            onChangeText={setIngredients}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
            <Text style={styles.addButtonText}>Lägg till</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Avbryt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddRecipeModal;
