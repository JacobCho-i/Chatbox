import { MessageBubble } from './MessageBubble';

export function MessageTableCell({ messages }) {
    return (
      <td style={styles.cell}>
        {messages.map(message => (
            <div>
                <MessageBubble key={message.id} text={message.text} />
            </div>
        ))}
      </td>
    );
  };
  
  const styles = {
    cell: {
      padding: '10px',
      border: '1px solid #ccc',
      verticalAlign: 'top',
    }
  };
  