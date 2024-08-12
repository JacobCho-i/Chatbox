import { Height } from '@mui/icons-material';
import { MessageBubble } from './MessageBubble';

export function MessageTableCell({ messages }) {
    return (
      <td style={styles.cell}>
        <div style={styles.scrollable}>
            {messages.map(message => (
               <MessageBubble key={message.id} text={message.text} id={message.sender} />
            ))}
        </div>
      </td>
    );
  };
  
  const styles = {
    cell: {
      width: '400px',
      padding: '10px',
      border: '1px solid #ccc',
      verticalAlign: 'top',
    },
    scrollable: {
        height: '400px', 
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column', 
    },
  };
  