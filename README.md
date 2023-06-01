# Phonebook_CICD_Render
Phonebook application with CI/CD in Render (Fullstackopen - part11)

This version implements both backend and frontend of phonebook application.
- Backend is located here in this root directory
- Production build of the frontend is located in "build"-directory
- Frontend source codes is located in "frontend" directory

In addition CI/CD practices are taken into use with GitHub Actions

Application user interface:
  - https://https://phonebook-cicd-version.onrender.com

The application requires the following environment variables to be defined:
- MONGODB_URI=XXX
- PHONEBOOK_PORT=XXX


Available API endpoints:
- Health check
    - https://https://phonebook-cicd-version.onrender.com/health
- Version information
    - https://https://phonebook-cicd-version.onrender.com/version
- General Status Information
    - https://https://phonebook-cicd-version.onrender.com/info
- Persons API (JSON)
    - https://https://phonebook-cicd-version.onrender.com/api/persons
- Person API
    - https://https://phonebook-cicd-version.onrender.com/api/persons/<id>

