const luisSelectorBtn = document.querySelector('#luis-selector')
const sofiaSelectorBtn = document.querySelector('#sofia-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

let messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Luis' ? 'blue-bg' : 'grey-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

const renderMessages = () => {
  chatMessages.innerHTML = messages.map(createChatMessageElement).join('')
}

window.onload = () => {
  renderMessages()
}

let messageSender = 'Luis'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`
  chatInput.focus()

  luisSelectorBtn.classList.toggle('active-person', name === 'Luis')
  sofiaSelectorBtn.classList.toggle('active-person', name === 'Sofia')
  luisSelectorBtn.setAttribute('aria-pressed', name === 'Luis')
  sofiaSelectorBtn.setAttribute('aria-pressed', name === 'Sofia')
}

luisSelectorBtn.onclick = () => updateMessageSender('Luis')
sofiaSelectorBtn.onclick = () => updateMessageSender('Sofia')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  chatMessages.innerHTML += createChatMessageElement(message)
  chatInputForm.reset()
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  messages = []
  chatMessages.innerHTML = ''
})
