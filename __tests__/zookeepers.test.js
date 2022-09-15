const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("creates a zookeeper object,", () => {
    const keeper = createNewZookeeper(
        { name: "Darlene", id:"awerg167"},
        zookeepers
    );

    expect(keeper.name).toBe("Darlene");
    expect(keeper.id).toBe("awerg167");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];

    const updatedZookeepers = filterByQuery({ name: 'Raksha'}, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by ID", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];

    const result = findById("0",startingZookeepers);

    expect(result.name).toBe("Kim");
});

test("validates personality traits", () => {
    const keeper = {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin"
    }
    
      const invalidKeeper = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
      };

      const result = validateZookeeper(keeper);
      const result2 = validateZookeeper(invalidKeeper);

      expect(result).toBe(true);
      expect(result2).toBe(false);
});