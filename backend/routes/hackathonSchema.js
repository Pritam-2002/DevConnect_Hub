const express = require('express');
const Hackathon = require('../models/hackathonSchema');  // Import the Hackathon model
const User = require('../models/user');  // Import the User model to check if the user exists
const { jwtAuthMiddleware } = require('../auth/jwt');
const router = express.Router();

// POST - Create a new Hackathon
router.post('/post', jwtAuthMiddleware, async (req, res) => {
    try {
        const authorId=req.user.id.id
        if(!authorId){
            return res.status(404).json({error:"unauthorize"})
        }
        const { title, description, startDate, endDate, location, hackathonlink, participants } = req.body;

        // Check if all required fields are provided
        if (!title || !description || !startDate || !endDate || !location || !hackathonlink || !authorId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the author exists in the User model (user must exist in the database)
        const author = await User.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found.' });
        }

        const hackathon = new Hackathon({
            title,
            description,
            startDate,
            endDate,
            location,
            hackathonlink,
            author: authorId, // Store the ID of the author who created the hackathon
            participants: participants || []  // If no participants are provided, store an empty array
        });

        // Save the hackathon to the database
        await hackathon.save();

        return res.status(201).json({
            message: 'Hackathon created successfully!',
            hackathon
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
