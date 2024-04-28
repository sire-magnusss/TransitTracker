import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Icon component

const HelpScreen = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the sign-up button and following the instructions.",
      isVisible: false,
    },
    {
      question: "What is the refund policy?",
      answer:
        "Our refund policy allows you to request a refund within 30 days of purchase.",
      isVisible: false,
    },
    {
      question: "How do I change my password?",
      answer: "You can change your password from your account settings page.",
      isVisible: false,
    },
    {
      question: "How can I give feedback about the app?",
      answer:
        "Your feedback is valuable to us! You can give feedback through the 'Feedback' section in the app. We look forward to hearing your suggestions and comments.",
      isVisible: false,
    },
    {
      question: "Is my personal information secure with the app?",
      answer:
        "We prioritize your privacy and security. Your personal information is protected with advanced encryption and security measures. Please refer to our Privacy Policy for more details.",
      isVisible: false,
    },
    {
      question: "Can I use the app offline?",
      answer:
        "Certain features of the app, such as viewing saved data, are available offline. However, features that require real-time data access may not function without an internet connection.",
      isVisible: false,
    },
    {
      question: "How do I update my profile information?",
      answer:
        "You can update your profile information by navigating to the 'Profile' section in the app and selecting 'Edit Profile'. Be sure to save your changes before exiting.",
      isVisible: false,
    },
    {
      question: "How can I reset my password if I forget it?",
      answer:
        "If you forget your password, you can reset it by selecting the 'Forgot Password' option at the login screen. Follow the prompts to receive an email with instructions on how to set a new password.",
      isVisible: false,
    },
  ]);

  const [feedback, setFeedback] = useState("");

  const toggleFAQ = (index) => {
    const newFaqs = faqs.map((faq, i) => {
      if (i === index) {
        faq.isVisible = !faq.isVisible;
      }
      return faq;
    });
    setFaqs(newFaqs);
  };

  const submitFeedback = () => {
    console.log("Feedback submitted:", feedback);
    setFeedback(""); // Clear the input field after submission
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.headerText}>Help & Support</Text>

        {/* Help Section 1 */}
        <Text style={styles.sectionTitle}>Getting Started</Text>
        <Text style={styles.text}>
          This section shows how to navigate across the app.
        </Text>

        {/* FAQ Section with Icon */}
        <View style={styles.sectionHeader}>
          <Icon name="question-answer" size={24} color="#2E7D32" />
          <Text style={styles.sectionTitle}>FAQs</Text>
        </View>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              onPress={() => toggleFAQ(index)}
              style={styles.faqQuestion}
            >
              <Text style={styles.question}>
                <Icon name="navigate-next" size={20} color="#2E7D32" />{" "}
                {faq.question}
              </Text>
            </TouchableOpacity>
            {faq.isVisible && <Text style={styles.answer}>{faq.answer}</Text>}
          </View>
        ))}

        {/* Feedback Section with Icon */}
        <View style={styles.sectionHeader}>
          <Icon name="feedback" size={24} color="#2E7D32" />
          <Text style={styles.sectionTitle}>Feedback</Text>
        </View>
        <View style={styles.feedbackContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setFeedback}
            value={feedback}
            placeholder="Type your feedback here..."
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
          />
          <Button
            title="Submit Feedback"
            onPress={submitFeedback}
            color="#2E7D32"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Softer gray background
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
    color: "#2E7D32", // Green for headers
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#333333",
    paddingLeft: 10,
  },
  text: {
    fontSize: 16,
    color: "#333333",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    paddingLeft: 5,
  },
  answer: {
    fontSize: 14,
    color: "#666666",
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
  feedbackContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 100,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    textAlignVertical: "top",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
});

export default HelpScreen;
