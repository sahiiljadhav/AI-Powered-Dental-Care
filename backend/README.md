# Dental AI Backend Service

This Python-based backend service powers the AI capabilities of the Ultimate Dental Chatbot. It provides advanced natural language processing, symptom analysis, appointment scheduling, and patient data management.

## Features

- **AI-Powered Symptom Analysis**: Machine learning models to diagnose dental issues
- **Natural Language Processing**: Intent detection and contextual responses
- **Appointment Scheduling**: Smart scheduling with availability checking
- **Patient Data Management**: Secure storage and retrieval of patient records
- **Multi-language Support**: Translation and localization capabilities
- **Emergency Detection**: Automatic identification of urgent dental issues

## Technical Architecture

### Core Components

1. **FastAPI Web Server**: High-performance API endpoints
2. **Machine Learning Models**:
   - Symptom classifier (RandomForest)
   - Intent detection (DistilBERT)
   - Sentiment analysis (Transformer-based)
3. **Database Integration**:
   - MongoDB for patient records and appointments
   - Redis for caching and session management
4. **Security Layer**:
   - JWT authentication
   - Password hashing
   - CORS protection

### Data Models

The service uses Pydantic models for data validation and serialization:

- `ToothLocation`: Enum for specific tooth positions
- `SymptomSeverity`: Classification of symptom intensity
- `UrgencyLevel`: Classification of treatment urgency
- `AppointmentType`: Types of dental appointments
- `PatientRecord`: Complete patient information schema

## API Endpoints

### Symptom Analysis
\`\`\`
POST /api/symptom-analysis
\`\`\`
Analyzes dental symptoms and provides diagnosis, recommendations, and treatment options.

### Chat Processing
\`\`\`
POST /api/chat
\`\`\`
Processes natural language messages, detects intent, and generates appropriate responses.

### Appointment Scheduling
\`\`\`
POST /api/appointments
\`\`\`
Schedules dental appointments based on patient preferences and availability.

### Patient Management
\`\`\`
GET /api/patients/{patient_id}
POST /api/patients
PUT /api/patients/{patient_id}
\`\`\`
CRUD operations for patient records.

### Health Check
\`\`\`
GET /api/health
\`\`\`
System health monitoring endpoint.

## Deployment

### Prerequisites
- Python 3.9+
- MongoDB
- Redis
- GPU recommended for production NLP processing

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/your-org/dental-ai-backend.git
cd dental-ai-backend
\`\`\`

2. Create and activate virtual environment
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Set environment variables
\`\`\`bash
export MONGO_CONNECTION_STRING="mongodb://username:password@host:port"
export REDIS_URL="redis://host:port"
export SECRET_KEY="your-secret-key-for-jwt"
\`\`\`

5. Run the server
\`\`\`bash
uvicorn dental_ai_service:app --host 0.0.0.0 --port 8000
\`\`\`

### Docker Deployment

\`\`\`bash
docker build -t dental-ai-backend .
docker run -p 8000:8000 -e MONGO_CONNECTION_STRING="mongodb://..." -e REDIS_URL="redis://..." dental-ai-backend
\`\`\`

## Integration with Frontend

The backend service integrates with the Next.js frontend through API calls. The frontend sends requests to the backend for:

1. Processing chat messages
2. Analyzing dental symptoms
3. Scheduling appointments
4. Managing patient records

## Security Considerations

- All API endpoints are protected with JWT authentication
- Patient data is encrypted at rest and in transit
- API rate limiting prevents abuse
- Input validation prevents injection attacks
- CORS policies restrict access to authorized origins

## Performance Optimization

- Redis caching for frequently accessed data
- Database indexing for fast queries
- Asynchronous processing for long-running tasks
- Model quantization for efficient inference

## Monitoring and Logging

- Structured logging with timestamp, level, and context
- Health check endpoint for system monitoring
- Error tracking and reporting
- Performance metrics collection

## Future Enhancements

1. **Advanced ML Models**: Train specialized models for specific dental conditions
2. **Real-time Analysis**: Implement streaming analysis for live video diagnosis
3. **Federated Learning**: Privacy-preserving model training across clinics
4. **Voice Analysis**: Detect pain and urgency from voice patterns
5. **Integration with Dental Imaging**: Process and analyze dental X-rays and scans
