import {useEffect, useState, useRef} from 'react'
import './App.css'
import {Button, TextField} from "@mui/material";

type Message = {
    message: string
    from: 'user' | 'bot'
}

function App() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [userMessage, setUserMessage] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: string, from: 'user' | 'bot' ) => {
      setMessages((messages) => [...messages, {message, from}]);
  }

  const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

  const onSendMessageClicked = () => {
      addMessage(userMessage, 'user');

      let botMessage: Message | null = null;
      if (userMessage.toLowerCase().includes('fotos')) {
          botMessage = {
              from: 'bot',
              message: '¿Las fotos de esta persona parecen demasiado perfectas o profesionales? Usa herramientas como la búsqueda inversa en Google Imágenes para verificar si esas fotos están en otros sitios.'
          }
      }

      if (userMessage.toLowerCase().includes('biograf')) {
          botMessage = {
              from: 'bot',
              message: '¿La información en su perfil tiene sentido? Por ejemplo, si dice que es médico, ¿tiene horarios raros para trabajar o cosas que no coinciden? Desconfía si hay contradicciones.'
          }
      }

      if (userMessage.toLowerCase().includes('video')) {
          botMessage = {
              from: 'bot',
              message: '¿Te ha evitado hacer una videollamada o siempre tiene excusas? Este es un comportamiento típico de perfiles falsos. Insiste en hablar cara a cara para confirmar su identidad.'
          }
      }

      if (userMessage.toLowerCase().includes('redes')) {
          botMessage = {
              from: 'bot',
              message: '¿Su perfil en redes sociales tiene pocas fotos, seguidores o actividad? Esto puede ser una señal de que el perfil no es real. Busca señales de interacción auténtica, como comentarios de amigos reales.'
          }
      }

      if (userMessage.toLowerCase().includes('mensajes')) {
          botMessage = {
              from: 'bot',
              message: '¿Te envía mensajes con errores extraños o frases que no tienen sentido? Muchas veces, los catfish usan traductores automáticos o mensajes preescritos.'
          }
      }

      if (userMessage.toLowerCase().includes('dinero')) {
          botMessage = {
              from: 'bot',
              message: 'Si te pide dinero, aunque sea una cantidad pequeña, ¡detente! Esta es una señal clara de que algo no está bien. Nunca envíes dinero a alguien que no tenga conocido en persona.'
          }
      }

      if (userMessage.toLowerCase().includes('amor')) {
          botMessage = {
              from: 'bot',
              message: '¿Alguien que acabas de conocer ya te dice que eres el amor de su vida? Esto puede ser una táctica para ganarse tu confianza. Mantente alerta y no te presiones a confiar.',
          }
      }

      if (userMessage.toLowerCase().includes('excusas')) {
          botMessage = {
              from: 'bot',
              message: '¿Siempre tiene una razón para no verte en persona o evitar preguntas directas? Esto es común en perfiles falsos. Insista en respuestas claras y coherentes.'
          }
      }

      if (userMessage.toLowerCase().includes('detalles')) {
          botMessage = {
              from: 'bot',
              message: '¿Notas algo raro en su historia? Por ejemplo, ¿cambios en su edad, trabajo o lugar donde vive? Esto puede ser una señal de que algo no cuadra.'
          }
      }

      if (userMessage.toLowerCase().includes('seguridad')) {
          botMessage = {
              from: 'bot',
              message: 'Para protegerte, nunca compartas información personal como tu dirección, fotos íntimas o datos bancarios. Si algo no te convence, confía en tus instintos y corta la comunicación.'
          }
      }

      if (!botMessage) {
          botMessage = {
              from: 'bot',
              message: 'Perdona no te he entendido, ¿puedes formular la pregunta de otro modo?'
          }
      }

      addMessage(botMessage.message, botMessage.from);
      setUserMessage('');
  }

    useEffect(() => {
        setMessages([
            {
                message: 'Hola, soy tu asistente para evitar estafas en línea y perfiles falsos. Si tienes dudas sobre alguien que conoces en internet, escribe una palabra clave como "fotos", "videollamada" o "redes sociales", y te ayudará a identificar señales de alerta.',
                from: 'bot',
            }
        ])
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages.length]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <div style={{
            fontSize: '24px',
            fontWeight: 700,
            textShadow: `
        -1px -1px 0 #000, 
        1px -1px 0 #000,  
        -1px 1px 0 #000, 
        1px 1px 0 #000    
    `
        }}>
            Cazando Máscaras
        </div>
     <div style={{
         width: '100%',
         backgroundColor: 'white',
         display: 'flex',
         padding: '28px',
         minWidth: '400px',
         maxWidth: '400px',
         borderRadius: '16px',
         flexDirection: 'column',
         alignItems: 'flex-start',
         height: '100%',
         maxHeight: '600px',
     }}>
         <div style={{
             width: '100%',
             height: '500px',
             maxHeight: '500px',
             overflow: 'hidden',
             overflowY: 'scroll'
         }}
              ref={messagesEndRef}
         >
             {messages.map((m, i) => <div key={i} style={{
                 width: '100%',
                 display: 'flex',
                 justifyContent: m.from === 'user' ? 'start' : 'end',
                 marginBottom: '16px',
             }}>
                 <div style={{
                     width: '60%',
                     padding: '8px 16px',
                     backgroundColor: m.from === 'user' ? 'yellowgreen' : 'blueviolet',
                     borderRadius: '16px',
                     textAlign: m.from === 'user' ? 'left' : 'right',
                 }}>
                     {m.from && <span></span>}{m.message}
                 </div>
             </div>)}
         </div>
         <div style={{
             width: '100%',
             display: 'flex',
             gap: '16px'
         }}>
             <TextField sx={{
                 width: '100%',
             }}
             value={userMessage}
             onKeyDown={(e) => {if (e.key === 'Enter') {onSendMessageClicked()}}}
             onChange={(e) => setUserMessage(e.target.value as string)}/>
             <Button onClick={() => onSendMessageClicked()}>Enviar</Button>
         </div>
     </div>
    </div>
  )
}

export default App
