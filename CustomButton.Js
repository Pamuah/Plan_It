import React from 'react';

const CustomButton = ({
  title,
  trailingIcon,
  backgroundColor = '#007AFF',
  height = 50,
  width = 120,
  onPress,
}) => {
  const handlePress = (event) => {
    if (onPress) {
      onPress(event); 
    }
  };

  return (
    <button
      style={{
        backgroundColor,
        height,
        width,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
      onMouseDown={handlePress} 
      onMouseUp={(event) => event.target.blur()} 
        
    >
      {title}
      {trailingIcon && (
        <span style={{ marginLeft: '8px' }}>{trailingIcon}</span>
      )}
    </button>
  );
};

