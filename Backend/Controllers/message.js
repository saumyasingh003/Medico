import Message from "../Models/message.js";
import ErrorHandler from "../Middlewares/Errormiddleware.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { firstname, lastname, phone, email, message } = req.body;

    if (!firstname || !lastname || !phone || !email || !message) {
      return next(new ErrorHandler("Please fill the full form !!", 400));
    }

    const newMessage = await Message.create({
      firstname,
      lastname,
      phone,
      email,
      message,
    });
    if (!newMessage) {
      return next(new ErrorHandler("Message creation failed !!", 500));
    }

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully !!" });
  } catch (error) {
    next(error);
  }
};

export const viewMessage = async (req, res, next) => {
  try {
    const messages = await Message.find();
    if (messages.length === 0) {
      return next(new ErrorHandler("No messages found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully !!",
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
