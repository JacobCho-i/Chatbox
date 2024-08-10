export function MessageBubble({ text }) {
    return (
      <div style={styles.bubble}>
        {text}
      </div>
    );
  };
  
  const styles = {
    bubble: {
      padding: '10px 15px',
      margin: '5px 0',
      borderRadius: '20px',
      backgroundColor: '#e0e0e0',
      display: 'inline-block',
      maxWidth: '80%',
      wordWrap: 'break-word',
    }
};
  