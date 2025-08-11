// index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Mock pets data
const pets = [
  { id: 1, name: "Buddy", type: "Dog", age: 3, breed: "Beagle", image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=500" },
  { id: 2, name: "Luna", type: "Cat", age: 2, breed: "Persian", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500" },
  { id: 3, name: "Snowball", type: "Rabbit", age: 1, breed: "Mini Lop", image: "https://media.istockphoto.com/id/499124260/photo/white-rabbit-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=66j5bzJiwCbZTNj4HXX9_El4ysEmlG95tdDbstub1bs=" },
  { id: 4, name: "Kiwi", type: "Parrot", age: 4, breed: "Macaw", image: "https://plus.unsplash.com/premium_photo-1725400833844-002996739d10?w=600&auto=format&fit=crop&q=60" },
  { id: 5, name: "Max", type: "Dog", age: 5, breed: "German Shepherd", image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500" },
  { id: 6, name: "Peachy", type: "Lovebird", age: 2, breed: "Fischer’s Lovebird", image: "https://images.unsplash.com/photo-1607580235587-3ae8361e89ea?w=600&auto=format&fit=crop&q=60" },
  { id: 7, name: "Milo", type: "Cat", age: 3, breed: "Siamese", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500" },
  { id: 8, name: "Cotton", type: "Rabbit", age: 1, breed: "Holland Lop", image: "https://images.unsplash.com/photo-1655481727563-c4e78cc4e515?w=600&auto=format&fit=crop&q=60" },
  { id: 9, name: "Charlie", type: "Dog", age: 2, breed: "Golden Retriever", image: "https://images.unsplash.com/photo-1507660392550-9aff6e04c7e5?w=600&auto=format&fit=crop&q=60" },
  { id: 10, name: "Sunny", type: "Parrot", age: 6, breed: "Cockatoo", image: "https://images.unsplash.com/photo-1692316846461-f448e1353492?w=600&auto=format&fit=crop&q=60" }
];

// Pet facts
const petFacts = {
  "Buddy": "Dogs like Buddy can learn over 100 words and commands!",
  "Luna": "Cats like Luna sleep for 12-16 hours a day to conserve energy.",
  "Snowball": "Rabbits like Snowball have nearly 360-degree vision.",
  "Kiwi": "Parrots like Kiwi can mimic human speech with remarkable accuracy.",
  "Max": "Dogs like Max have an extraordinary sense of smell 40x better than humans.",
  "Peachy": "Lovebirds like Peachy form strong pair bonds with their mates.",
  "Milo": "Cats like Milo communicate using over 100 different sounds.",
  "Cotton": "Rabbits like Cotton love to dig and burrow to create cozy homes.",
  "Charlie": "Dogs like Charlie use their tail to communicate emotions.",
  "Sunny": "Parrots like Sunny can live up to 70 years in captivity!"
};

// API 1: GET /pets
app.get("/pets", (req, res) => {
  const petList = pets.map(({ id, name, type, image }) => ({ id, name, type, image }));
  res.json(petList);
});

// API 2: GET /pets/:id
app.get("/pets/:id", (req, res) => {
  const petId = parseInt(req.params.id);
  const pet = pets.find(p => p.id === petId);

  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }

  res.json({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    age: pet.age,
    breed: pet.breed,
    fun_fact: petFacts[pet.name],
    image: pet.image
  });
});

// API 3: POST /adopt
app.post("/adopt", (req, res) => {
  const { pet_id, applicant_name, email, reason } = req.body;

  // Basic validation
  if (!pet_id || !applicant_name || !email || !reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const pet = pets.find(p => p.id === pet_id);
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }

  // Mock adoption request creation
  const adoptionId = Math.floor(Math.random() * 10000) + 1000;

  res.json({
    adoption_id: adoptionId,
    status: "pending_review",
    message: "Your adoption request has been received!"
  });
});

// Start server
const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
