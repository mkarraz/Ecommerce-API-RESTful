import { normalize, denormalize, schema } from 'normalizr'

const normalizeAndDenormalize = (action: string, messagesArray: any) => {

  const author = new schema.Entity(
    'author',
    {},
    { idAttribute: 'userEmail' }
  )

  const message = new schema.Entity(
    "message",
    { author: author },
    { idAttribute: 'id' }
  )

  const messagesSchema = new schema.Entity(
    'messages',
    { messages: [message], },
    { idAttribute: 'id' }
  )

  if (action == "normalize") {
    return normalize({ id: 'messages', messages: messagesArray }, messagesSchema)

  } else {
    const prueba = denormalize(messagesArray.result, messagesSchema, messagesArray.entities)
    return prueba
  }
}

export default normalizeAndDenormalize