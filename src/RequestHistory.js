import React from 'react';

const RequestHistory = ({history, onHistoryItemClick}) => {
    return (
        <div>
            {history.map((request, index) => (
                <div
                    key={index}
                    onClick={() => onHistoryItemClick(request)}
                >
                    <span className="clickable-text">{request}</span>
                </div>
            ))}
        </div>
    );
};

export default RequestHistory;