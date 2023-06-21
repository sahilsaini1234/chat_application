const socket=io('http://localhost:8000')

const form=document.getElementById('send-container')
const message=document.getElementById('message-input')
const msgcotainer=document.querySelector('container-lg border 2px mt-4 bg-light message')


const name=prompt("enter your name to join");