import User from "../models/user.model.js";

import path from "path";

// Import the 'fs/promises' module for file system operations
import fs from 'fs/promises';

import cloudinary from 'cloudinary';

const calculatePercentage = (user) => {
    const totalFields = 5; 
    let completedFields = 0;

    // Check for the presence of fields
    if (user.name) completedFields += 1;
    if (user.email) completedFields += 1;
    if (user.address) completedFields += 1;
    if (user.phoneNumber) completedFields += 1;
    if (user.image) completedFields += 1;

    // Calculate the percentage based on the completed fields
    return (completedFields / totalFields) * 100;
};

const Next = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({ name, email });

        // Calculate the completion percentage based on the user data
        const percentage = calculatePercentage(user);

        res.json({ success: true, percentage, userId: user._id });
    } catch (error) {
        console.error('Error submitting first-level form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const GetPercentage = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Recalculate the completion percentage based on the user data
        const percentage = calculatePercentage(user);

        res.json({ success: true, percentage });
    } catch (error) {
        console.error('Error retrieving percentage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const Submit = async (req, res) => {
    try {
        const { address, phoneNumber } = req.body;

        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Retrieve the previous completion percentage from the user document
        const prevPercentage = user.percentage || 0;

        // Update only the provided fields for the second level
        if (address) {
            user.address = address;
        }

        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }

        // Upload image to Cloudinary if a file is provided
        if (req.file) {
            console.log('Starting img upload to Cloudinary');

            // Upload the file to Cloudinary and obtain the result
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user-images',
                width: 250,
                height: 250,
            });

            // Check if the image upload was successful
            if (!result || !result.secure_url) {
                console.error('Error uploading image to Cloudinary');
                return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
            }

            console.log('Image uploaded successfully', result);
            user.image = result.secure_url;
        }

        const newPercentage = calculatePercentage(user);

        // Calculate the final completion percentage by adding the previous and new percentages
        const finalPercentage = prevPercentage + newPercentage;

        // Update the user document with the final completion percentage
        user.percentage = finalPercentage;

        // Save the updated user document in the database
        await user.save();

        res.json({ success: true, percentage: finalPercentage, savedData: user });
    } catch (error) {
        console.error('Error submitting second-level form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { Next, Submit,GetPercentage };
