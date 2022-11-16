import dotenv from 'dotenv'

dotenv.config()

const config = {
  PERSISTENCE: process.argv[4] || process.env.PERSISTENCE || 1,
  PORT: process.env.PORT || 8081,
  ENVIRONMENT_MODE: process.env.ENVIRONMENT_MODE,

  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  MONGO_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  SECRET_KEY: process.env.SECRET_KEY,
  SESSION_TIME: process.env.SESSION_TIME,

  TWILIO_ACCOUNTSID: process.env.TWILIO_ACCOUNTSID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_ADMIN_NUMBER: process.env.TWILIO_ADMIN_NUMBER,
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,

  GMAIL_MAIL: process.env.GMAIL_MAIL,
  GMAIL_PROVISIONAL_PASS: process.env.GMAIL_PROVISIONAL_PASS,
  
}

export default config