import { colors } from "@mui/material";

export function MessageBubble({ text, id }) {
  return (
    <div style={id === 0 ? styles.myBubbleContainer : styles.botBubbleContainer}>
        <div style={id === 0 ? styles.myBubble : styles.botBubble}>
            {text}
        </div>
    </div>
);
    
  };
  
  const styles = {
    myBubbleContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '10px',
  },
  botBubbleContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '10px',
  },
    myBubble: {
        padding: '10px 15px',
        borderRadius: '20px',
        backgroundColor: '#33a7ff',
        display: 'inline-block',
        maxWidth: '80%',
        wordWrap: 'break-word',
        textAlign: 'left',
        color: '#ffffff'
    },
    botBubble: {
        padding: '10px 15px',
        borderRadius: '20px',
        backgroundColor: '#e0e0e0',
        display: 'inline-block',
        maxWidth: '80%',
        wordWrap: 'break-word',
        textAlign: 'left',
    }
};
  