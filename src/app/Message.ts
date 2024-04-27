export interface Message {
  message: string,
  topicName: string,
  attributes: {
    sender: string,
    dest: string
  }
}

