import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = await req.body; // Getting message from user as input
    const { id: receiverId } = req.params; // Getting receiver id from params
    const senderId = req.user._id; // Senderid coming from req.user, protectRoute

    // FIND CONVERSATION BETWEEN USERS
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    // IF CONVERSATION DOESN'T EXIST, CREATE ONE
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // CREATE NEW MESSAGE
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    // ADD MESSAGE TO MESSAGES ARRAY IN CONVERSATION
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // SAVE MESSAGE AND CONVERSATION TO DB IN PARALLEL
    await Promise.all([conversation.save(), newMessage.save()]);
    // FINALLY SEND MESSAGE JSON AS A RESPONSE
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sentMessage Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
