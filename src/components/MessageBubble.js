import { colors } from "@mui/material";

export function MessageBubble({ text, id }) {
    if (id == 0) {
        return (
            <div style={styles.myBubble}>
              {text}
            </div>
          );
    } else {
        return (
            <div style={styles.botBubble}>
              {text}
            </div>
          );
    }
    
  };
  
  const styles = {
    myBubble: {
        padding: '10px 15px',
        margin: '5px 0',
        marginRight: 'auto',
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
        margin: '5px 0',
        marginLeft: 'auto',
        borderRadius: '20px',
        backgroundColor: '#e0e0e0',
        display: 'inline-block',
        maxWidth: '80%',
        wordWrap: 'break-word',
        textAlign: 'left',
    }
};
  