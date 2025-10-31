Project Title
AI-Powered Vocabulary Trainer Web Application with User Management and Profile Updating 
Introduction
This project aims to enhance vocabulary learning through AI-powered word searches, personalized quizzes, and a comprehensive user management system including secure login and profile updating. The platform leverages AI to provide dynamic, context-rich vocabulary experiences for learners.
Functionalities and Modules
Module 1: User Registration and Authentication
•	Secure user registration and login with JWT token-based authentication.
•	Enables stateless and scalable user sessions.
•	User information Isolation.
Module 2: Word Search and AI Integration
•	Users can search for words to get meanings, multilingual translations, and example sentences.
•	Uses OpenAI API to provide rich, contextual vocabulary information.
•	Supports efficient search queries and result rendering.
Module 3: Quiz Generation and Checking
•	AI-driven quiz creation based on searched or saved vocabulary words.
•	Automatically generates correct and incorrect options for quizzes.
•	Backend validation of user quiz answers to track performance.
Module 4: Personalized User Profile Management
•	Users have profiles storing personal information (name, email, preferences, bio).
•	Ability to securely update profile details via dedicated API endpoints.
•	Input validation and authorization to ensure users can only modify their own data.
Module 5: Data Storage and Management
•	MongoDB as a centralized database.
•	Collections for users, words, personal_info, quizzes, and results linked by user ID.
•	Efficient data schema design for performance and scalability.
 
Summary
This project provides an AI-enhanced vocabulary learning platform with personalized quizzes, secure user authentication, and comprehensive profile management. The modular design supports scalable development and real-world usability, delivering an engaging and personalized language learning experience.
